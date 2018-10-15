const repo = "todaysCuriosity";
const owner = "mrhut10";
const requestURL =
  "https://api.github.com/repos/" + owner + "/" + repo + "/contributors";

const contributors = [];

const request = new XMLHttpRequest();
request.open("GET", requestURL);
request.responseType = "json";
request.send();

request.onload = function() {
  request.response.forEach(contributor => {
    contributors.push({
      login: contributor.login,
      html_url: contributor.html_url,
      contributions: contributor.contributions
    });
  });

  console.log(contributors);
  const footerContents = document.createElement("p");
  footerContents.append("A project by ");

  contributors.forEach((contributor, index) => {
    const contributorElement = document.createElement("a");
    contributorElement.append(
      contributor.login + "(" + contributor.contributions + ")"
    );
    contributorElement.setAttribute("href", contributor.html_url);

    console.log(contributors.length, index);

    footerContents.appendChild(contributorElement);

    if (contributors.length - 2 === index) {
      footerContents.append(" and ");
    } else if (contributors.length - 2 >= index) {
      footerContents.append(", ");
    }
  });

  footerContents.append(".");

  const footer = document.querySelector("#footer");

  footer.append(footerContents);
};
