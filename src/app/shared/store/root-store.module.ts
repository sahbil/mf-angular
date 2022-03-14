import { NgModule } from "@angular/core";
import { NavigationActionTiming, routerReducer, StoreRouterConnectingModule } from "@ngrx/router-store";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { RouterSerializer } from "./rooter-serializer";

@NgModule({
    imports: [
        StoreRouterConnectingModule.forRoot({
            serializer: RouterSerializer,
            navigationActionTiming: NavigationActionTiming.PostActivation
        }),
        StoreModule.forRoot({
            router: routerReducer
        }),
        StoreDevtoolsModule.instrument({
            name: 'AG CRUD',
            logOnly: true,
            maxAge: 25
        })
    ]
})
export class RootStoreModule { }