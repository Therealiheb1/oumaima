import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
    {
        id: 1,
        label: 'MENUITEMS.MENU.TEXT',
        isTitle: true
    },
   
            {
                id: 3,
                label: 'Accueil',
                icon: 'bx-home-circle',
                link: '/dashboard',
                parentId: 2
            },
            {
                id: 7,
                isLayout: true
            },
        
            {
                id: 10,
                label: 'Formation',
                icon: 'bx bxs-slideshow',
                link: '/formation',
                
            },
            {
                id: 7,
                isLayout: true
            },
        
            {
                id: 10,
                label: 'Event',
                icon: 'bx bx-calendar-event',
                link: '/event',
                
            },
            {
                id: 7,
                isLayout: true
            },
        
            {
                id: 10,
                label: 'Hackathon',
                icon: 'bx-aperture',
                link: '/hackathon',
                
            },
    {
        id: 7,
        isLayout: true
    },

    {
        id: 10,
        label: 'Support',
        icon: 'bx-chat',
        link: '/chat',
        
    },
    
    

    
];

