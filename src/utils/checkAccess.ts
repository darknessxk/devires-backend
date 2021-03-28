import { accessGroups } from '../config/accessGroups';

export const checkAccess = (desc: string): boolean => accessGroups.includes(desc);
