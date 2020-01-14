import { PreloadingStrategy, Route } from "@angular/router";
import { Observable } from "rxjs";
import { of } from "rxjs";

export class CustomPreloadStrategy implements PreloadingStrategy{
    preload(route: Route, load: () => Observable<any>): Observable<any> {
        return route.data && route.data.nopreload ? of(null) : load();
    }    
}