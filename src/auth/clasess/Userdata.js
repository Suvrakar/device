import { useReactOidc } from '@axa-fr/react-oidc-context';

export class UserData{

    getProfile() {
        const { oidcUser } = useReactOidc();
        const {profile}=oidcUser
        return profile?profile:false
    }

    getAccessToken(){
        const { oidcUser } = useReactOidc();
        if(oidcUser)return oidcUser.access_token
        return false

    }
}
