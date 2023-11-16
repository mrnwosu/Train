import { useSession } from "next-auth/react";
import { api } from "./api";
import fs from "fs";
import {env} from '../env.mjs'

export function GetCurrentUser() {
  const { data: sessionData } = useSession();
  if (!sessionData?.user?.id) return null;

  const user = api.user.getUser.useQuery({ id: sessionData.user.id });
  return user;
}

export function GetCurrentUserRole(){
    const { data: sessionData } = useSession();
    if (!sessionData?.user?.id) return null;
    const user = api?.user?.getUser?.useQuery({ id: sessionData.user.id });
    if(!user) return null;

    return user.data?.role;
}

export function dumpToFileForDev(filename: string, data: unknown){
    if(env.NODE_ENV !== 'development') return;
    
    if(!fs.existsSync('./dump')){
        fs.mkdirSync('./dump');
    }

    const string = JSON.stringify(data, null, 2);
    fs.writeFileSync(`./dump/${filename}.json`, string)
}