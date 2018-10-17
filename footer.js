import * as idb from 'idb-keyval';

async function fetchGithubContributors(requestURL) {
  let response;
  if ('caches' in window) {
    response = await caches.match(requestURL);
    if (!response) {
      response = await fetch(requestURL);
      const cache = await caches.open(requestURL);
      await cache.put(requestURL, response.clone());
    }
  } else {
    // browser does not support the cache APi
    response = await fetch(requestURL);
  }

  response = await fetch(requestURL);
  const contributors = await response.json();
  return contributors;
}

function createContributorsHtml(contributors) {
  const contributorListElements = contributors.map((contributor)=>{
    return `
    <li>
      <a href="${contributor.html_url}">
        <img src="${contributor.avatar_url}" class='avatar-img'>
        <div>${contributor.login}</div>
      </a>
    </li>
    `;
  }).join('');
  return `
  <span>A project by...</span>
  <ul class='footer-list'>
    ${contributorListElements}
  </ul>
  `;
}

async function getContributorsHTML() {
  const repo = "todaysCuriosity";
  const owner = "mrhut10";
  const requestURL = `https://api.github.com/repos/${owner}/${repo}/contributors`;
  let contributorsHtml;

  const lastContributors = await idb.get('LastGithubResponse');
  if (lastContributors) {
    contributorsHtml = createContributorsHtml(lastContributors);
  } else {
    const contributors = await fetchGithubContributors(requestURL);
    contributorsHtml = createContributorsHtml(contributors);
    idb.set('LastGithubResponse', contributors);
  }
  return contributorsHtml;
}

export default getContributorsHTML;

// getContributorsHTML();