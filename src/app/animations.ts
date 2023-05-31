import {
    trigger, animateChild, group,
    transition, animate, style, query
} from '@angular/animations';


// Routable animations
export const slideInAnimation =
    trigger('routeAnimation', [
        transition('* <=> location', [
            style({ position: 'relative' }),
            query(':enter, :leave', [
                style({
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%'
                })
            ]),
            query(':enter', [
                style({ transform: 'translateY(-100%)' })
            ]),
            query(':leave', animateChild()),
            group([
                query(':leave', [
                    animate('300ms ease-out', style({ transform: 'translateY(100%)' }))
                ]),
                query(':enter', [
                    animate('300ms ease-out', style({ transform: 'translateY(-100%)' }))
                ])
            ]),
            query(':enter', animateChild()),
        ])
    ]);