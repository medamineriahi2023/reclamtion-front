import { KeycloakService } from 'keycloak-angular';
import {KeycloakConfig} from "keycloak-js";

const keycloakConfig: KeycloakConfig = {
    url: 'http://localhost:8180',
    realm: 'central-stamp',
    clientId: 'central-stamp'
};

export const initializer = (keycloak: KeycloakService) => () =>
    keycloak.init({
        config: keycloakConfig,
        initOptions: {
            onLoad: 'login-required',
            checkLoginIframe: false,
        },});
