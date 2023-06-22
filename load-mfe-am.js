function refreshUJWToken(productInstanceId) {
    return new Promise(async function (resolve, reject) {
      const originUrl = window.location.origin.replace(
        /(app|app-staging)\./,
        "www."
      );
  
      const response = await fetch(`${originUrl}/sfcore.do`, {
        method: "POST",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          request: {
            ...(productInstanceId && {productInstanceId}),
            requestInfo: {
              apiAccessKey: "yneujmorzfuezfwrczobxjr5jdg",
              clientId: "NSI",
              method: "getJWTTokenV1",
              service: "ProductAPI",
            },
          },
        }),
      });
  
      if (response.ok) {
        const respJson = await response.json();
        resolve(respJson.response.data.a_token);
      } else {
        reject("Refreshing UJWT failed");
      }
    });
  }
  
  async function getUjwtAndInit() {
    const ujwt = await refreshUJWToken();
  
    // Create a new <div> element
    var divElement = document.createElement("div");
  
    // Set the id attribute of the <div> element
    divElement.id = "ox-email-node";
  
    divElement.style.marginLeft = "270px";
    divElement.style.marginTop = "88px";
  
    // Append the <div> element after the <body> tag
    document.body.insertAdjacentElement("afterbegin", divElement);
  
    // Create a new <script> element
    var scriptElement = document.createElement("script");
  
    // Set the source attribute of the script
    scriptElement.src =
      "https://beta.frontend-svcs.rosetta-dns.net/rosetta-include-component.js";
  
    // Define the function to be executed once the script is loaded
    scriptElement.onload = function () {
      // Call your desired function here
      Rosetta.appendComponentScripts(`ox-mailboxes-mfe@0.0.2`).then(() => {
        OxMailboxesMfe.init({
          element: document.getElementById("ox-email-node"),
          token: ujwt,
          locale: "en",
          data: {},
          theme: {}, // Optional
          callbacks: {
            refreshAccessToken: refreshUJWToken,
          },
        });
      });
    };
  
    // Append the script element to the <head> section
    document.head.appendChild(scriptElement);
  }
  
  getUjwtAndInit();
  