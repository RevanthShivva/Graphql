import fetch from "node-fetch";
import fs from "fs";

const openSource = {
    githubConvertedToken: "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",
    githubUserName: "RevanthShivva",
  };

const query_pr = {
    query: `
      query {
        user(login: "${openSource.githubUserName}"){
          pullRequests(last: 100, orderBy: {field: CREATED_AT, direction: DESC}){
        totalCount
        nodes{
          id
          title
          url
          state
            mergedBy {
                avatarUrl
                url
                login
            }
            createdAt
            number
          changedFiles
            additions
            deletions
          baseRepository {
                name
                url
                owner {
                  avatarUrl
                  login
                  url
                }
              }
        }
      }
      }
  }
      `,
  };
  const baseUrl = "https://api.github.com/graphql";

const headers = {
  "Content-Type": "application/json",
  Authorization: "bearer " + openSource.githubConvertedToken,
};

fetch(baseUrl, {
  method: "POST",
  headers: headers,
  body: JSON.stringify(query_pr),
})
  .then((response) => response.text())
  .then((txt) => {
    const data = JSON.parse(txt);
    var cropped = { data: [] };
    cropped["data"] = data["data"]["user"]["pullRequests"]["nodes"];

    var open = 0;
    var closed = 0;
    var merged = 0;
    for (var i = 0; i < cropped["data"].length; i++) {
      if (cropped["data"][i]["state"] === "OPEN") open++;
      else if (cropped["data"][i]["state"] === "MERGED") merged++;
      else closed++;
    }

    cropped["open"] = open;
    cropped["closed"] = closed;
    cropped["merged"] = merged;
    cropped["totalCount"] = cropped["data"].length;

    console.log("Fetching the Pull Request Data.\n");
    fs.writeFile(
      "./src/shared/opensource/pull_requests.json",
      JSON.stringify(cropped),
      function (err) {
        if (err) {
          console.log(err);
        }
      }
    );
  })
  .catch((error) => console.log(JSON.stringify(error)));


    const query_issue = {
      query: `query{
        user(login: "${openSource.githubUserName}") {
        issues(last: 100, orderBy: {field:CREATED_AT, direction: DESC}){
          totalCount
          nodes{
            id
            closed
            title
            createdAt
            url
            number
            assignees(first:100){
              nodes{
                avatarUrl
                name
                url
              }
            }
            repository{
              name
              url
              owner{
                login
                avatarUrl
                url
              }
            }
          }
        }
      }
      }`,
    };

    fetch(baseUrl, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(query_issue),
    })
      .then((response) => response.text())
      .then((txt) => {
        const data = JSON.parse(txt);
        var cropped = { data: [] };
        cropped["data"] = data["data"]["user"]["issues"]["nodes"];
    
        var open = 0;
        var closed = 0;
        for (var i = 0; i < cropped["data"].length; i++) {
          if (cropped["data"][i]["closed"] === false) open++;
          else closed++;
        }
    
        cropped["open"] = open;
        cropped["closed"] = closed;
        cropped["totalCount"] = cropped["data"].length;
    
        console.log("Fetching the Issues Data.\n");
        fs.writeFile(
          "./src/shared/opensource/issues.json",
          JSON.stringify(cropped),
          function (err) {
            if (err) {
              console.log(err);
            }
          }
        );
      })
      .catch((error) => console.log(JSON.stringify(error)));

      const query_repositories = {
        query: `query{
        viewer {
          name
           repositories(last: 5) {
             nodes {
               name
             }
           }
         }
      }
                `,
      };

      fetch(baseUrl, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(query_repositories),
      })
        .then((response) => response.text())
        .then((txt) => {
          const data = JSON.parse(txt);
          var cropped = { data: [] };
          cropped["data"] = data["data"]["viewer"]["repositories"]["nodes"];
      
          var open = 0;
          var closed = 0;
          for (var i = 0; i < cropped["data"].length; i++) {
            if (cropped["data"][i]["closed"] === false) open++;
            else closed++;
          }
      
          cropped["open"] = open;
          cropped["closed"] = closed;
          cropped["totalCount"] = cropped["data"].length;
      
          console.log("Fetching the Repositories Data.\n");
          fs.writeFile(
            "./src/shared/opensource/last_five_repos.json",
            JSON.stringify(cropped),
            function (err) {
              if (err) {
                console.log(err);
              }
            }
          );
        })
        .catch((error) => console.log(JSON.stringify(error)));