import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import DataStoreService from "service/DataStoreService";
import { ContextProvider } from "types/ContextProvider";
import { KeyValueObject } from "types/KeyValueList";
import MonthList from "data/MonthList";
import YearList from "data/YearList";

type SelectListProviderProps = ContextProvider;

type SelectListContextProps = {
    ORGANIZATIONS: KeyValueObject[];
    TEAMS: KeyValueObject[];
    MONTHS: KeyValueObject[];
    YEARS: KeyValueObject[];
    ROLES: KeyValueObject[];
}

const SelectListContext = createContext<SelectListContextProps>({} as SelectListContextProps);

const SelectListProvider = ({ children }: SelectListProviderProps) => {
    const DEFAULT_SELECT_ITEM: KeyValueObject = useMemo(() => ({ label: "Select", value: "" }), []);
    const monthList: KeyValueObject[] = [DEFAULT_SELECT_ITEM, ...MonthList];
    const yearList: KeyValueObject[] = [DEFAULT_SELECT_ITEM, ...YearList];
    const [orgList, setOrgList] = useState<KeyValueObject[]>([]);
    const [teamList, setTeamList] = useState<KeyValueObject[]>([]);
    const [roleList, setRoleList] = useState<KeyValueObject[]>([]);

    const processSelectList = useCallback((dataList: string[]): KeyValueObject[] => {
        return [DEFAULT_SELECT_ITEM, ...dataList.map((listItem) => ({ label: listItem, value: listItem, }))];
    }, [DEFAULT_SELECT_ITEM]);

    const getOrganizations = useCallback(() => {
        DataStoreService.getOrganizationList()
            .then(response => {
                const orgList = processSelectList(response)
                setOrgList(orgList);
            })
            .catch(error => {
                console.log(error);
            });
    }, [processSelectList]);

    const getTeams = useCallback(() => {
        DataStoreService.getTeamList()
            .then(response => {
                const teamList = processSelectList(response)
                setTeamList(teamList);
            })
            .catch(error => {
                console.log(error);
            });
    }, [processSelectList]);

    const getRoles = useCallback(() => {
        DataStoreService.getRoleList()
            .then(response => {
                const roleList = processSelectList(response)
                setRoleList(roleList);
            })
            .catch(error => {
                console.log(error);
            });
    }, [processSelectList]);

    useEffect(() => {
        getOrganizations();
        getTeams();
        getRoles();
    }, [getOrganizations, getTeams, getRoles]);

    const value = {
        ORGANIZATIONS: orgList,
        TEAMS: teamList,
        MONTHS: monthList,
        YEARS: yearList,
        ROLES: roleList,
    };

    return (
        <SelectListContext.Provider value={value}>{children}</SelectListContext.Provider>
    );
}

const useSelectListContext = () => useContext(SelectListContext);

export { useSelectListContext, SelectListProvider };