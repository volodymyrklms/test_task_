import axios from "axios";
import {apiDomain} from "../constants";
import {TreeSelectInterface} from "../interfaces/treeSelect";
import labelsMapping from "../labels.json";

function getNodes(parent: number | null = null) {
    const url = parent ? `${apiDomain}/data/?parent=${parent}` : `${apiDomain}/data/`;
    return axios.get(url)
        .then(res => {
            if (res.status !== 200) {
                return Promise.reject(res);
            }
            return Promise.resolve<TreeSelectInterface[]>(res.data);
        })
        .catch(err => {
            console.log(err);
        });
}

function convertLabels(data: Array<TreeSelectInterface>) {
    function capitalizeString(data: string) {
        return data.charAt(0).toUpperCase() + data.slice(1).toLowerCase();
    }

    data.forEach(select => {
        select.name = Object.keys(labelsMapping).includes(select.name) ? Object(labelsMapping)[select.name] :
            capitalizeString(select.name).replace("_", " ");
    });
    return data
}

export {getNodes, convertLabels};
