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
      avatar_url: contributor.avatar_url,
      login: contributor.login,
      html_url: contributor.html_url,
      contributions: contributor.contributions
    });
  });

  const footerText = document.createElement("p");
  footerText.append("A project by ");

  const footerAvatar = document.createElement("p");

  contributors.forEach((contributor, index) => {
    // footer text
    const contributorElement = document.createElement("a");
    contributorElement.append(
      contributor.login + "(" + contributor.contributions + ")"
    );
    contributorElement.setAttribute("href", contributor.html_url);

    footerText.appendChild(contributorElement);

    if (contributors.length - 2 === index) {
      footerText.append(" and ");
    } else if (contributors.length - 2 >= index) {
      footerText.append(", ");
    }

    // footer avatar
    const avatarLink = document.createElement("a");
    avatarLink.setAttribute("href", contributor.html_url);
    const avatarImg = document.createElement("img");
    avatarImg.setAttribute("src", contributor.avatar_url);
    avatarImg.setAttribute("height", "40px");
    avatarImg.setAttribute("width", "40px");

    avatarLink.append(avatarImg);

    footerAvatar.append(avatarLink);
  });

  footerText.append(".");

  const footer = document.querySelector("#footer");

  footer.append(footerAvatar);
  footer.append(footerText);
};
