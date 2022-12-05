import axios from "axios";

export function uploadImage(image) {
    return axios
        .post("https://www.filestackapi.com/api/store/S3", image, {
            params: {
                key: "AdMQeeRmGRsmhtWKfZ6RJz",
            },
            headers: {
                "Content-Type": "image/png",
            },
        })
}
