import { createContext, useCallback, useContext, useEffect, useState } from "react";
import DataStoreService from "service/DataStoreService";
import { ContextProvider } from "types/ContextProvider";
import { KeyValueObject } from "types/KeyValueList";
import MonthList from "data/MonthList";
import YearList from "data/YearList";

type SelectListProviderProps = ContextProvider;

type SelectListContextProps = {
    orgList: KeyValueObject[];
    teamList: KeyValueObject[];
    monthList: KeyValueObject[];
    yearList: KeyValueObject[];
}

const SelectListContext = createContext<SelectListContextProps>({} as SelectListContextProps);

const SelectListProvider = ({ children }: SelectListProviderProps) => {
    const DEFAULT_SELECT_ITEM: KeyValueObject = { label: "Select", value: "" };
    const monthList: KeyValueObject[] = [DEFAULT_SELECT_ITEM, ...MonthList];
    const yearList: KeyValueObject[] = [DEFAULT_SELECT_ITEM, ...YearList];
    const [orgList, setOrgList] = useState<KeyValueObject[]>([]);
    const [teamList, setTeamList] = useState<KeyValueObject[]>([]);

    const getOrganizations = useCallback(() => {
        DataStoreService.getOrganizationList()
            .then(response => {
                const orgList = processSelectList(response)
                setOrgList(orgList);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const getTeams = useCallback(() => {
        DataStoreService.getTeamList()
            .then(response => {
                const teamList = processSelectList(response)
                setTeamList(teamList);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const processSelectList = (dataList: string[]): KeyValueObject[] => {
        return [DEFAULT_SELECT_ITEM, ...dataList.map((listItem) => ({ label: listItem, value: listItem, }))];
    };

    useEffect(() => {
        getOrganizations();
        getTeams();
    }, [getOrganizations, getTeams]);

    const value = {
        orgList,
        teamList,
        monthList,
        yearList,
    };

    return (
        <SelectListContext.Provider value={value}>{children}</SelectListContext.Provider>
    );
}

const useSelectListContext = () => useContext(SelectListContext);

export { useSelectListContext, SelectListProvider };