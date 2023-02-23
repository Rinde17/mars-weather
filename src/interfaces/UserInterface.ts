import { User } from "../types/UserType";
import {Dispatch, SetStateAction} from "react";

export interface UserInterface {
    user: User,
    setUser: Dispatch<SetStateAction<User>>
}