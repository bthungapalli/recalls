import { OpaqueToken } from '@angular/core'
export interface IAppConstant {
    REGISTRATION_URL: string;
}

export const AppConstant:IAppConstant= {
  REGISTRATION_URL:"/registration"
};

export let APP_CONSTANTS = new OpaqueToken('app.constant');
