import React, {useState, useEffect, ChangeEvent} from "react";
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import {FormControl, InputLabel, MenuItem, Select, Typography} from "@material-ui/core";
import getNodes from "../services/treeService";
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
    const [selectsData, setSelectsData] = useState<Array<number>>([]);
    const [curIndex, setCurIndex] = useState<number>(0);
    const [data, setData] = useState<Array<Array<TreeSelectInterface>>>([]);
    const [description, setDescription] = useState<string>('');

    const classes = useStyles();

    useEffect(() => {
        if (data.length === 0) {
            getNodes()
                .then(res => {
                    setData([res as Array<TreeSelectInterface>]);
                });
        }
    })

    useEffect(() => {
        getNodes(selectsData[curIndex])
            .then(res => {
                res = res as Array<TreeSelectInterface>;
                if (res[0].name === "DESCRIPTION") {
                    setDescription(res[0].text);
                } else {
                    const newData = [...data];
                    newData.push(res);
                    setData(newData);
                }
            });
    }, [selectsData]);

    const selectChange = (e: ChangeEvent<{ name?: string | undefined; value: unknown; }>, index: number) => {
        const newData: Array<number> = [...selectsData];
        newData[index] = e.target.value as number;
        setSelectsData(newData.slice(0, index + 1));
        setData(data.slice(0, index + 1));
        setCurIndex(index);
    }

    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <FormControl>
                    {description ? <Typography className={classes.text}>
                        {description}
                    </Typography> : null}
                </FormControl>
                {data.length > 0 ? data.map((select, index) => (
                    <FormControl>
                        <InputLabel id={`${index}`}>{select[0].name}</InputLabel>
                        <Select
                            key={`${index}`}
                            className={classes.select}
                            id={`${index}`}
                            multiple={false}
                            value={selectsData[index]}
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
