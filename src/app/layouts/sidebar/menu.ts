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
        id: 113,
        icon: 'bxs-bar-chart-alt-2',
        label: 'Vote',
        
                link: '/vote',
                parentId: 113
    },
{
id: 7,
isLayout: true
},


            


    // {
    //     id: 36,
    //     label: 'MENUITEMS.INVOICES.TEXT',
    //     icon: 'bx-receipt',
    //     subItems: [
    //         {
    //             id: 37,
    //             label: 'MENUITEMS.INVOICES.LIST.INVOICELIST',
    //             link: '/invoices/list',
    //             parentId: 36
    //         },
    //         {
    //             id: 38,
    //             label: 'MENUITEMS.INVOICES.LIST.INVOICEDETAIL',
    //             link: '/invoices/detail',
    //             parentId: 36
    //         },
    //     ]
    // },
    // {
    //     id: 39,
    //     label: 'MENUITEMS.PROJECTS.TEXT',
    //     icon: 'bx-briefcase-alt-2',
    //     subItems: [
    //         {
    //             id: 40,
    //             label: 'MENUITEMS.PROJECTS.LIST.GRID',
    //             link: '/projects/grid',
    //             parentId: 38
    //         },
    //         {
    //             id: 41,
    //             label: 'MENUITEMS.PROJECTS.LIST.PROJECTLIST',
    //             link: '/projects/list',
    //             parentId: 38
    //         },
    //         {
    //             id: 42,
    //             label: 'MENUITEMS.PROJECTS.LIST.OVERVIEW',
    //             link: '/projects/overview',
    //             parentId: 38
    //         },
    //         {
    //             id: 43,
    //             label: 'MENUITEMS.PROJECTS.LIST.CREATE',
    //             link: '/projects/create',
    //             parentId: 38
    //         }
    //     ]
    // },
    
   
    // {
    //     id: 52,
    //     label: 'MENUITEMS.BLOG.TEXT',
    //     icon: 'bx-file',
    //     badge: {
    //         variant: 'success',
    //         text: 'MENUITEMS.EMAIL.LIST.TEMPLATE.BADGE',
    //     },
    //     subItems: [
    //         {
    //             id: 53,
    //             label: 'MENUITEMS.BLOG.LIST.BLOGLIST',
    //             link: '/blog/list',
    //             parentId: 52
    //         },
    //         {
    //             id: 54,
    //             label: 'MENUITEMS.BLOG.LIST.BLOGGRID',
    //             link: '/blog/grid',
    //             parentId: 52
    //         },
    //         {
    //             id: 55,
    //             label: 'MENUITEMS.BLOG.LIST.DETAIL',
    //             link: '/blog/detail',
    //             parentId: 52
    //         },
    //     ]
    // },
    {
        id: 56,
        label: 'MENUITEMS.PAGES.TEXT',
        isTitle: true
    },
    {
        id: 57,
        label: 'MENUITEMS.AUTHENTICATION.TEXT',
        icon: 'bx-user-circle',
        badge: {
            variant: 'success',
            text: 'MENUITEMS.AUTHENTICATION.BADGE',
        },
        subItems: [
            {
                id: 58,
                label: 'MENUITEMS.AUTHENTICATION.LIST.LOGIN',
                link: '/account/login',
                parentId: 57
            },
            {
                id: 59,
                label: 'MENUITEMS.AUTHENTICATION.LIST.LOGIN2',
                link: '/account/login-2',
                parentId: 57
            },
            {
                id: 60,
                label: 'MENUITEMS.AUTHENTICATION.LIST.REGISTER',
                link: '/account/signup',
                parentId: 57
            },
            {
                id: 61,
                label: 'MENUITEMS.AUTHENTICATION.LIST.REGISTER2',
                link: '/account/signup-2',
                parentId: 57
            },
            {
                id: 62,
                label: 'MENUITEMS.AUTHENTICATION.LIST.RECOVERPWD',
                link: '/account/reset-password',
                parentId: 57
            },
            {
                id: 63,
                label: 'MENUITEMS.AUTHENTICATION.LIST.RECOVERPWD2',
                link: '/account/recoverpwd-2',
                parentId: 57
            },
            {
                id: 64,
                label: 'MENUITEMS.AUTHENTICATION.LIST.LOCKSCREEN',
                link: '/pages/lock-screen-1',
                parentId: 57
            },
            {
                id: 65,
                label: 'MENUITEMS.AUTHENTICATION.LIST.LOCKSCREEN2',
                link: '/pages/lock-screen-2',
                parentId: 57
            },
            {
                id: 66,
                label: 'MENUITEMS.AUTHENTICATION.LIST.CONFIRMMAIL',
                link: '/pages/confirm-mail',
                parentId: 57
            },
            {
                id: 67,
                label: 'MENUITEMS.AUTHENTICATION.LIST.CONFIRMMAIL2',
                link: '/pages/confirm-mail-2',
                parentId: 57
            },
            {
                id: 68,
                label: 'MENUITEMS.AUTHENTICATION.LIST.EMAILVERIFICATION',
                link: '/pages/email-verification',
                parentId: 57
            },
            {
                id: 69,
                label: 'MENUITEMS.AUTHENTICATION.LIST.EMAILVERIFICATION2',
                link: '/pages/email-verification-2',
                parentId: 57
            },
            {
                id: 70,
                label: 'MENUITEMS.AUTHENTICATION.LIST.TWOSTEPVERIFICATION',
                link: '/pages/two-step-verification',
                parentId: 57
            },
            {
                id: 71,
                label: 'MENUITEMS.AUTHENTICATION.LIST.TWOSTEPVERIFICATION2',
                link: '/pages/two-step-verification-2',
                parentId: 57
            }
        ]
    },








    
    // {
    //     id: 100,
    //     label: 'MENUITEMS.FORMS.TEXT',
    //     icon: 'bxs-eraser',
    //     badge: {
    //         variant: 'danger',
    //         text: 'MENUITEMS.FORMS.BADGE',
    //     },
    //     subItems: [
    //         {
    //             id: 101,
    //             label: 'MENUITEMS.FORMS.LIST.ELEMENTS',
    //             link: '/form/elements',
    //             parentId: 100
    //         },
    //         {
    //             id: 102,
    //             label: 'MENUITEMS.FORMS.LIST.LAYOUTS',
    //             link: '/form/layouts',
    //             parentId: 100
    //         },
    //         {
    //             id: 103,
    //             label: 'MENUITEMS.FORMS.LIST.VALIDATION',
    //             link: '/form/validation',
    //             parentId: 100
    //         },
    //         {
    //             id: 104,
    //             label: 'MENUITEMS.FORMS.LIST.ADVANCED',
    //             link: '/form/advanced',
    //             parentId: 100
    //         },
    //         {
    //             id: 105,
    //             label: 'MENUITEMS.FORMS.LIST.EDITOR',
    //             link: '/form/editor',
    //             parentId: 100
    //         },
    //         {
    //             id: 106,
    //             label: 'MENUITEMS.FORMS.LIST.FILEUPLOAD',
    //             link: '/form/uploads',
    //             parentId: 100
    //         },
    //         {
    //             id: 107,
    //             label: 'MENUITEMS.FORMS.LIST.REPEATER',
    //             link: '/form/repeater',
    //             parentId: 100
    //         },
    //         {
    //             id: 108,
    //             label: 'MENUITEMS.FORMS.LIST.WIZARD',
    //             link: '/form/wizard',
    //             parentId: 100
    //         },
    //         {
    //             id: 109,
    //             label: 'MENUITEMS.FORMS.LIST.MASK',
    //             link: '/form/mask',
    //             parentId: 100
    //         }
    //     ]
    // },
   
  
   
];

