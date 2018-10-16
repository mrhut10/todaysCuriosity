const repo = "todaysCuriosity";
const owner = "mrhut10";
const requestURL =
  "https://api.github.com/repos/" + owner + "/" + repo + "/contributors";
const contributors = [];

// Adds spacing string between contributor
function contributorSpacing(arrayLength, index) {
  if (arrayLength - 2 === index) {
    return " and ";
  } else if (arrayLength - 2 >= index) {
    return ", ";
  }
  else {
    return "";
  }
}

const request = new XMLHttpRequest();
request.open("GET", requestURL);
request.responseType = "json";
request.send();

request.onload = function() {
  request.response.forEach(contributor => {
    contributors.push({
      avatar_url: contributor.avatar_url,
      login: contributor.login,
      html_url: contributor.html_url,
      contributions: contributor.contributions
    });
  });

  let contributorEl = `<span>A project by...</span>`;
  contributorEl += `<ul class='footer-list'>`;

  contributors.forEach((contributor, index) => {
    contributorEl += `
      <li>
          <a href="${contributor.html_url}">
            <img src="${contributor.avatar_url}" class='avatar-img'>
            <span>${contributor.login} (${contributor.contributions})</span>
          </a>
          <span>${contributorSpacing(contributors.length, index)}</span>
      <li>
    `
  });

  contributorEl += `</ul>`;

  document.querySelector("#footer").innerHTML = contributorEl;
};
