import axios from "axios";
import {apiDomain} from "../constants";
import {TreeSelectInterface} from "../interfaces/treeSelect";

function getNodes(parent: number | null = null) {
    console.log(parent);
    const url = parent ? `${apiDomain}/data/?parent=${parent}` : `${apiDomain}/data/`;
    return axios.get(url)
        .then(res => {
            if (res.status !== 200) {
                return Promise.reject(res);
            }
            return Promise.resolve<Array<TreeSelectInterface>>(res.data);
        })
        .catch(err => {
            console.log(err);
        });
}

export default getNodes;
