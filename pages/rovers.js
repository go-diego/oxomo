import React from "react";
import { useRouter } from "next/router";
import { Rovers } from "../api/nasa.api";

const roversApi = new Rovers();

const initialState = {
    ALL_ROVERS: {
        data: null,
        loading: true,
        error: false
    },
    MANIFEST: {
        data: null,
        loading: true,
        error: false
    },
    LATEST_PHOTOS: {
        data: null,
        loading: true,
        error: false
    }
};

function reducer(state, action) {
    switch (action.type) {
        case "GET_ALL_ROVERS":
            return {
                ...state,
                ...{ ALL_ROVERS: { ...state.ALL_ROVERS, ...action.payload } }
            };
        case "GET_MANIFEST":
            return {
                ...state,
                ...{ MANIFEST: { ...state.MANIFEST, ...action.payload } }
            };
        case "GET_LATEST_PHOTOS":
            return {
                ...state,
                ...{
                    LATEST_PHOTOS: { ...state.LATEST_PHOTOS, ...action.payload }
                }
            };
        default:
            return state;
    }
}

export default function RoverPage() {
    const router = useRouter();
    const { id } = router.query;
    const [store, dispatch] = React.useReducer(reducer, initialState);

    React.useEffect(() => {
        if (id) {
            function getData() {
                //const decodedId = Base64.decode(id);
                roversApi
                    .getAll()
                    .then(response =>
                        dispatch({
                            type: "GET_ALL_ROVERS",
                            payload: { loading: false, data: response }
                        })
                    )
                    .catch(() =>
                        dispatch({
                            type: "GET_ALL_ROVERS",
                            payload: { error: true, loading: false, data: null }
                        })
                    );

                roversApi
                    .getManifest("Curiosity")
                    .then(response =>
                        dispatch({
                            type: "GET_MANIFEST",
                            payload: { loading: false, data: response }
                        })
                    )
                    .catch(() =>
                        dispatch({
                            type: "GET_MANIFEST",
                            payload: { error: true, loading: false, data: null }
                        })
                    );

                roversApi
                    .getLatestPhotos("Curiosity")
                    .then(response =>
                        dispatch({
                            type: "GET_LATEST_PHOTOS",
                            payload: { loading: false, data: response }
                        })
                    )
                    .catch(() =>
                        dispatch({
                            type: "GET_LATEST_PHOTOS",
                            payload: { error: true, loading: false, data: null }
                        })
                    );

                // roversApi
                //     .getPhotos("Curiosity")
                //     .then(response => console.log("PHOTOS", response))
                //     .catch(error => console.log("ERROR", error));
            }
            getData();
        }
    }, [id]);

    console.log("STORE", store);
    return <h1>Rover Page</h1>;
}
