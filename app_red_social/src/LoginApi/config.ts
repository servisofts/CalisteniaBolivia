import { LoginApiConfigType } from "./types";

export const config: LoginApiConfigType = {
    google: {
        NombreDato: "gmail_key",
        clientId: "885912798330-2o9o5nmpdi2nf275ng201krcbsdi945s.apps.googleusercontent.com"
    },
    facebook: {
        NombreDato: "facebook_key",
        appId: "793641328579171"
    },
    apple: {
        NombreDato: "apple_key",
        clientId: "com.servisofts.ricky",
        redirectURI: "https://ricky.servisofts.com/login"
    }
}