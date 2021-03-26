import { Type } from "./Type"

export type User = {
    id: string;
    email: string;
    password: string;
    type: Type;
    status: boolean;
}
