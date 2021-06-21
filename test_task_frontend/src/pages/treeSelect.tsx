import React, {useState, useEffect, ChangeEvent} from "react";
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import {FormControl, InputLabel, MenuItem, Select, Typography} from "@material-ui/core";
import {getNodes, convertLabels} from "../services/treeService";
import {TreeSelectInterface} from "../interfaces/treeSelect";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: 'auto',
            width: 'fit-content'
        },
        container: {
            marginTop: '5%',
            justifyContent: 'center',
            display: "flex",
            flexDirection: 'column'
        },
        select: {
            minWidth: 400,
            minHeight: 50,
            margin: '5%'
        },
        text: {
            fontSize: 20,
            marginBottom: '5%'
        }
    }),
);


const TreeSelect = () => {
    const [selectsData, setSelectsData] = useState<number[]>([]);
    const [curIndex, setCurIndex] = useState<number>(0);
    const [data, setData] = useState<TreeSelectInterface[][]>([]);
    const [description, setDescription] = useState<string>('');

    const classes = useStyles();

    useEffect(() => {
        getNodes(selectsData[curIndex])
            .then(res => {
                res = res as TreeSelectInterface[];
                if (res[0].name === "DESCRIPTION") {
                    setDescription(res[0].text);
                } else {
                    setData(prevState => [...prevState, convertLabels(res as TreeSelectInterface[])]);
                }
            });
    }, [selectsData, curIndex]);

    const selectChange = (e: ChangeEvent<{ name?: string | undefined; value: unknown; }>, index: number) => {
        const newData: number[] = [...selectsData];
        newData[index] = e.target.value as number;
        setSelectsData(newData.slice(0, index + 1));
        setData(data.slice(0, index + 1));
        setCurIndex(index);
        setDescription("");
    }

    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <FormControl>
                    {description ?
                        <>
                            <Typography className={classes.text}>
                                <strong>Description:</strong> {description}
                            </Typography>
                        </> : null}
                </FormControl>
                {data.length > 0 ? data.map((select, index) => (
                    <FormControl key={index}>
                        <InputLabel id={`${index}`}>{select[0].name}</InputLabel>
                        <Select
                            key={`${index}`}
                            className={classes.select}
                            id={`${index}`}
                            multiple={false}
                            value={selectsData[index] ? selectsData[index] : ""}
                            onChange={(e) => selectChange(e, index)}
                        >
                            {select.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.text}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )) : null}
            </div>
        </div>
    );
}

export default TreeSelect;
