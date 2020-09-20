// A function to send a POST request with a new image
export const addImage = (form, dashboardComp, type) => {
    // the URL for the request
    const url = "/images";

    // The data we are going to send in our request
    const imageData = new FormData(form);

    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: "post",
        body: imageData,
    });
    console.log(request)

    // Send the request with fetch()
    fetch(request)
        .then(function (res) {
            // Handle response we get from the API.
            // Usually check the error codes to see what happened.
            if (res.status === 200) {
                // If image was added successfully, tell the user.
                if (type === 'image') {
                    dashboardComp.setState({
                        message1: {
                            body: "Success: Added an image.",
                            type: "success"
                        }
                    });
                } else {
                    dashboardComp.setState({
                        message2: {
                            body: "Success: Added an image.",
                            type: "success"
                        }
                    });                   
                }
                return res.json();
            } else {
                // If server couldn't add the image, tell the user.
                // Here we are adding a generic message, but you could be more specific in your app.
                if (type === 'image') {
                    dashboardComp.setState({
                        message1: {
                            body: "Error: Could not add image.",
                            type: "error"
                        }
                    });
                } else {
                    dashboardComp.setState({
                        message2: {
                            body: "Error: Could not add image.",
                            type: "error"
                        }
                    });                    
                }
            }
        })
        .then(json => {
            // the resolved promise with the JSON body
            if (type === 'image') {
                console.log("success: image")
                dashboardComp.setState({ imageId: json.image_url});
            } else {
                dashboardComp.setState({ certificateId: json.image_url});
            }
        }) 
        .catch(error => {
            console.log(error);
        });
};

// A function to send a GET request to the web server,
// and then loop through them and add a list element for each image
export const getImages = (imageListComp) => {
    // the URL for the request
    const url = "/images";

    // Since this is a GET request, simply call fetch on the URL
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.json();
            } else {
                alert("Could not get images");
            }
        })
        .then(json => {
            // the resolved promise with the JSON body
            imageListComp.setState({ imageList: json.images });
        })
        .catch(error => {
            console.log(error);
        });
};
