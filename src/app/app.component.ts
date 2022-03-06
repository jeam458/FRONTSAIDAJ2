import { Component, Inject, LOCALE_ID, Renderer2 } from '@angular/core';
import { ConfigService } from '../@vex/services/config.service';
import { Settings } from 'luxon';
import { DOCUMENT } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { NavigationService } from '../@vex/services/navigation.service';
import icLayers from '@iconify/icons-ic/twotone-layers';
import { LayoutService } from '../@vex/services/layout.service';
import { ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { SplashScreenService } from '../@vex/services/splash-screen.service';
import { Style, StyleService } from '../@vex/services/style.service';
import { ConfigName } from '../@vex/interfaces/config-name.model';

@Component({
  selector: 'vex-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'vex';

  constructor(private configService: ConfigService,
              private styleService: StyleService,
              private renderer: Renderer2,
              private platform: Platform,
              @Inject(DOCUMENT) private document: Document,
              @Inject(LOCALE_ID) private localeId: string,
              private layoutService: LayoutService,
              private route: ActivatedRoute,
              private navigationService: NavigationService,
              private splashScreenService: SplashScreenService) {
    Settings.defaultLocale = this.localeId;

    if (this.platform.BLINK) {
      this.renderer.addClass(this.document.body, 'is-blink');
    }

    /**
     * Customize the template to your needs with the ConfigService
     * Example:
     *  this.configService.updateConfig({
     *    sidenav: {
     *      title: 'Custom App',
     *      imageUrl: '//placehold.it/100x100',
     *      showCollapsePin: false
     *    },
     *    showConfigButton: false,
     *    footer: {
     *      visible: false
     *    }
     *  });
     */

    /**
     * Config Related Subscriptions
     * You can remove this if you don't need the functionality of being able to enable specific configs with queryParams
     * Example: example.com/?layout=apollo&style=default
     */
    this.route.queryParamMap.pipe(
      map(queryParamMap => queryParamMap.has('rtl') && coerceBooleanProperty(queryParamMap.get('rtl'))),
    ).subscribe(isRtl => {
      this.document.body.dir = isRtl ? 'rtl' : 'ltr';
      this.configService.updateConfig({
        rtl: isRtl
      });
    });

    this.route.queryParamMap.pipe(
      filter(queryParamMap => queryParamMap.has('layout'))
    ).subscribe(queryParamMap => this.configService.setConfig(queryParamMap.get('layout') as ConfigName));

    this.route.queryParamMap.pipe(
      filter(queryParamMap => queryParamMap.has('style'))
    ).subscribe(queryParamMap => this.styleService.setStyle(queryParamMap.get('style') as Style));


    this.navigationService.items = [
      {
       type: 'dropdown',
       label: 'Archivo',
       children: [
         {
           type: 'link',
           label: 'Expedientes',
           route: '/pages/expediente',
           icon: icLayers
         },
         {
           type: 'link',
           label: 'legajos',
           route: '/pages/legajo',
           icon: icLayers
         },
       ]
      },
      {
       type: 'dropdown',
       label: 'Mantenimientos',
       children: [
         {
           type: 'dropdown',
           label: 'Dependencias',
           children: [
             { 
               type: 'link',
               label: 'Crear Dependencia',
               route: '/pages/creardependencia',
               icon: icLayers
             },
             { 
               type: 'link',
               label: 'Listado de Dependencias',
               route: '/pages/listdependencia',
               icon: icLayers
             }
           ]
         },
         {
           type: 'dropdown',
           label: 'Actos Procesales',
           children: [
             { 
               type: 'link',
               label: 'Crear Acto Procesal',
               route: '/pages/crearacto',
               icon: icLayers
             },
             { 
               type: 'link',
               label: 'Listado Actos Procesales',
               route: '/pages/listacto',
               icon: icLayers
             }
           ]
         },
         {
           type: 'dropdown',
          label: 'Tipo Partes',
           
           children: [
             { 
               type: 'link',
               label: 'Crear Tipo Parte',
               route: '/pages/creartipo',
               icon: icLayers
             },
             { 
               type: 'link',
               label: 'Listado Partes',
               route: '/pages/listtipoparte',
               icon: icLayers
             }
           ]
           
         },
         {
           type: 'dropdown',
          label: 'Partes',
           
           children: [
             { 
               type: 'link',
               label: 'Crear Parte',
               route: '/pages/crearparte',
               icon: icLayers
             },
             { 
               type: 'link',
               label: 'Listado Partes',
               route: '/pages/listparte',
               icon: icLayers
             }
           ]
           
         }
       ]
      },
      {
       type: 'dropdown',
       label: 'Usuarios',
       children: [
         {
           type: 'link',
           label: 'Crear Usuario',
           route: '/pages/asignartarea',
           icon: icLayers
         },
         {
           type: 'link',
           label: 'Accesos',
           route: '/pages/asignartarea',
           icon: icLayers
         },
       ]
      },
      {
       type: 'link',
       label: 'Producción',
       route: '/pages/asignartarea',
       icon: icLayers
     }
     /*{
       type: 'link',
       label: 'Asignar Tarea',
       route: '/pages/asignartarea',
       icon: icLayers
     },
     {
       type: 'link',
       label: 'Tareas Pendientes',
       route: '/pages/pendientes',
       icon: icLayers
     },
     {
       type: 'link',
       label: 'Tareas en Proceso',
       route: '/pages/proceso',
       icon: icLayers
     },
     {
       type: 'link',
       label: 'Tareas Concluidas',
       route: '/pages/concluidos',
       icon: icLayers
     },
     {
       type: 'link',
       label: 'Todas las tareas',
       route: '/pages/todos',
       icon: icLayers
     }*/
   ];
  }
}
