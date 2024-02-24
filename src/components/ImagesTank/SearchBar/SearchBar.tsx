import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import SearchIcon from "@mui/icons-material/Search";
import {TextField} from "@mui/material";
import React from "react";

type SearchBarProps = {
    changeHandler: (ev: React.ChangeEvent<HTMLInputElement>) => void
}

const SearchBar = ({changeHandler}: SearchBarProps) => {

    return (
        <FormControl size="small" variant="filled" fullWidth>
            <TextField
                onChange={changeHandler}
                id="photo-search"
                type="search"
                label="Search Photo"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <SearchIcon/>
                        </InputAdornment>
                    ),
                }}
            />
        </FormControl>
    );
};

export default SearchBar;
