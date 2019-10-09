import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { loadModules } from 'esri-loader';

@Component({
  selector: 'app-arcgis3api',
  templateUrl: './arcgis3api.component.html',
  styleUrls: ['./arcgis3api.component.css']
})
export class Arcgis3apiComponent implements OnInit {
  @ViewChild('mapViewNode', { static:true }) private mapViewElementRef: ElementRef;
  public selectedFeatureName: string;
  constructor() { }

  ngOnInit() {
    const options = { version: '3.28', css: true };
    

    loadModules([
      'esri/map',
      'esri/layers/ArcGISDynamicMapServiceLayer',
	    'esri/layers/FeatureLayer',
      'esri/symbols/SimpleFillSymbol',
      'esri/symbols/SimpleLineSymbol',
      'esri/Color',
      'esri/tasks/query',
      'esri/tasks/QueryTask',
	    'esri/dijit/Legend',
      'esri/graphic',
    ], options)
      .then(([
        Map,
        ArcGISDynamicMapServiceLayer,
		    FeatureLayer,
        SimpleFillSymbol,
        SimpleLineSymbol,
        Color,
        Query,
        QueryTask,
		    Legend,
        Graphic
      ]) => {
        const map = new Map(this.mapViewElementRef.nativeElement, {
          center: [-94, 37],
          zoom: 5,
		      sliderOrientation: "horizontal",
          showLabels: true,
          autoResize: true,
          logo: false
        });
		
		    const muniFlayer = new FeatureLayer('https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer/2',{
			    mode: FeatureLayer.MODE_DEMAND,
        });

		
        map.addLayer(muniFlayer);

		  //for mouse
		    const highlightSymbol = new SimpleFillSymbol(
			    SimpleFillSymbol.STYLE_SOLID,
			    new SimpleLineSymbol(
				    SimpleLineSymbol.STYLE_SOLID,
				    new Color([255, 255, 255]), 2),
			    new Color([36, 33, 96, 0.4])
        );
		
		  //hovering over features
		    muniFlayer.on("mouse-over", function(event)
		    {
			    const highlightGraphic = new Graphic(event.graphic.geometry, highlightSymbol);
			    map.graphics.add(highlightGraphic);
		    });
		
		    //get the municipality name, PA amounts
        map.on('click', event => {
          const query = new Query();
          query.returnGeometry = true;
          query.outFields = ["*"]; 
          query.geometry = event.mapPoint;

          
          const queryTask = new QueryTask('https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer/2');

          //

          queryTask.execute(query, featureSet => {
            map.graphics.clear();
            const feature = featureSet.features[0];
            const mySymbol = new SimpleFillSymbol('none',
              new SimpleLineSymbol('solid', new Color([255, 255, 255]), 2), new Color([0, 0, 0, 0.25])
            );
            feature.setSymbol(mySymbol);
            map.graphics.add(feature);
            this.selectedFeatureName = feature.attributes.state_name;
			      console.log("Muni: " + this.selectedFeatureName); 
          });
        });
		
		
 		    map.on('load', function()
		    {
			    map.disableScrollWheel();//disable the mouse-wheel  scrolling 
			    map.disablePinchZoom();
			    //map.disableMapNavigation();
			    map.graphics.enableMouseEvents();
			    map.graphics.on("mouse-out", function(){map.graphics.clear()});
			
        });

      })
      .catch(err => {
        console.error(err);
      }); 

  }

}
