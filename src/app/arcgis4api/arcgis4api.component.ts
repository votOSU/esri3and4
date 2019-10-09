import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { loadModules } from 'esri-loader';

@Component({
  selector: 'app-arcgis4api',
  templateUrl: './arcgis4api.component.html',
  styleUrls: ['./arcgis4api.component.css']
})
export class Arcgis4apiComponent implements OnInit, AfterViewInit {

  @ViewChild('mapView', { static:true }) private mapViewEl: ElementRef;
  
  public selectedFeatureName: string;


  constructor()
  {
  }


  ngOnInit(){
    loadModules([
      "esri/core/watchUtils",
      "esri/Map",
      "esri/views/MapView",
      "esri/layers/FeatureLayer",
      "esri/renderers/UniqueValueRenderer",
      "esri/symbols/SimpleLineSymbol",
      "esri/layers/MapImageLayer"
      
    ])
      .then(([
        watchUtils,
        Map,
        MapView,
        FeatureLayer,
        UniqueValueRenderer,
        SimpleLineSymbol,
        MapImageLayer]) =>
      {
        let layerFeature = new FeatureLayer({
          url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer/3",
          outFields: ["*"]
        })
        const map = new Map({
          //basemap: "topo",
          layers: [layerFeature]
        });
        //map.add(layerFeature);
        var view = new MapView({
          container: this.mapViewEl.nativeElement,
          map: map,
          center: [-94, 37],
          zoom: 10
        });
        view.ui.remove("attribution");
        function changeCursor(response)
        {
          if (response.results.length > 0)
          {
            document.getElementById("map").style.cursor = "pointer";
          }
          else
          {
            document.getElementById("map").style.cursor = "default";
          }
        }

        function getGraphics(response)
        {
          view.graphics.removeAll();
          if (response.results.length > 0) {
            var graphic = response.results[0].graphic;
            graphic.symbol =
              {
                type: "simple-fill",
                style: "solid",
                color: [36, 33, 96, 0.4],
                outline:
                { 
                  color: "white",
                  width: 1
                }
              }
            view.graphics.add(graphic);
          }
        }

        view.when(function ()
        {
          view.whenLayerView(layerFeature).then(function (lview) 
          {
            watchUtils.whenFalseOnce(lview, "updating", function () {
              view.on("pointer-move", function (evt) {
                var screenPoint = {
                  x: evt.x,
                  y: evt.y
                };
                view.hitTest(screenPoint)
                  .then(function (response) {
                    if (response.results.length) {
                      var graphic = response.results.filter(dataResult => {
                        return dataResult.graphic.layer === layerFeature;
                      })[0].graphic;
                    }
                    changeCursor(response);
                    getGraphics(response);
                  });
              });
            });
          });
        });

        view.on('click', event => {
          view.hitTest(event).then(response => {
            if (response.results.length) 
            {

              const graphic = response.results.filter(result => {
                return result.graphic.layer === layerFeature;
              })[0].graphic;
              this.selectedFeatureName = graphic.attributes.state_name;
              console.log("Muni "+this.selectedFeatureName);
            };
          })
        });
        
        view.on("mouse-wheel", function(event){
          event.stopPropagation();
        })

      })
      .catch(err => {
        console.error(err);
      });
  }

  ngAfterViewInit()
  {
  }
}
