<template>
  <q-page class="flex flex-center row">
    <div class="row col-12  q-ma-lg justify-center">
      <div class="col-2">
        <q-select
          rounded
          outlined
          v-model="model"
          transition-show="flip-up"
          transition-hide="flip-down"
          :options="options"
          label="Area"
          @input="createMarker"
        />
      </div>
    </div>

    <div class="row col-12 justify-center">
      <q-table class="col-10" :data="computedArray" :columns="columns">
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="hotel_name" :props="props" title="test">
              <div class="my-table-details">
                {{ props.row.hotel_name }}
              </div>
            </q-td>
            <q-td key="country_area" :props="props">
              <div class="my-table-details">
                {{ props.row.country_area }}
              </div>
            </q-td>
            <q-td key="hotel_url" :props="props">
              <div class="my-table-details">
                <a :href="props.row.hotel_url"> {{ props.row.hotel_url }}</a>
              </div>
            </q-td>
            <q-td key="hotel_address" :props="props">
              <div class="my-table-details">
                {{ props.row.hotel_address }}
              </div>
            </q-td>
            <q-td key="review_score" :props="props">
              <div class="my-table-details">
                {{ props.row.review_score }}
              </div>
            </q-td>
            <q-td key="clean" :props="props">
              <div class="my-table-details">
                {{ props.row.clean }}
              </div>
            </q-td>
            <q-td key="comf" :props="props">
              <div class="my-table-details">
                {{ props.row.comf }}
              </div>
            </q-td>
            <q-td key="loct" :props="props">
              <div class="my-table-details">
                {{ props.row.loct }}
              </div>
            </q-td>
            <q-td key="fclt" :props="props">
              <div class="my-table-details">
                {{ props.row.fclt }}
              </div>
            </q-td>
            <q-td key="staff" :props="props">
              <div class="my-table-details">
                {{ props.row.staff }}
              </div>
            </q-td>
            <q-td key="vfm" :props="props">
              <div class="my-table-details">
                {{ props.row.vfm }}
              </div>
            </q-td>
            <q-td key="wifi" :props="props">
              <div class="my-table-details">
                {{ props.row.wifi }}
              </div>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
    <div class="row q-ma-lg">
      <div class="col-12">
        <div id="map" style="width: 600px; height: 600px;" />
      </div>
    </div>
  </q-page>
</template>

<script>
import * as get from "../boot/Service";
const MAP_BOX_KEY = process.env.VUE_MAPBOX_KEY;

export default {
  name: "PageIndex",
  data() {
    return {
      options: [
        "Todos",
        "Madrid",
        "Barcelona",
        "Costa Blanca",
        "Costa del Sol"
      ],
      model: "Todos",
      data: [],
      coords: [],
      markers: [],
      selectMarckers: [],
      filterData: [],
      addresses: [],
      columns: [
        {
          name: "hotel_name",
          required: true,
          label: "Hotel",
          align: "left",
          field: "hotel_name",
          format: val => `${val}`,
          sortable: true,
          classes: "bg-grey-2 ellipsis",
          headerClasses: "bg-primary text-white"
        },
        {
          name: "country_area",
          align: "center",
          label: "Area",
          field: "country_area",
          sortable: true
        },
        {
          name: "hotel_url",
          label: "URL",
          field: "hotel_url",
          sortable: true
        },
        { name: "hotel_address", label: "Address", field: "hotel_address" },
        { name: "review_score", label: "Review Score", field: "review_score" },
        { name: "clean", label: "Clean", field: "clean" },
        {
          name: "comf",
          label: "Comfort",
          field: "comf",
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
        },
        {
          name: "loct",
          label: "Location ",
          field: "loct",
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
        },
        {
          name: "fclt",
          label: "Facility",
          field: "fclt",
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
        },
        {
          name: "staff",
          label: "Staff",
          field: "staff",
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
        },
        {
          name: "vfm",
          label: "VFM",
          field: "vfm",
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
        },
        {
          name: "wifi",
          label: "Wifi",
          field: "wifi",
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
        }
      ]
    };
  },
  methods: {
    async getData() {
      const hotels = await get.getData();
      this.data = hotels.data;
      this.coords = await get.getCoords();
    },
    createMap: function() {
      mapboxgl.accessToken = MAP_BOX_KEY;
      this.map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [-3.041841, 41.471062],
        zoom: 5
      });
    },
    createMarker: function() {
      this.markers.forEach(mark => mark.remove());
      this.markers = [];
      this.coords.data.features.forEach(data => {
        if (data.properties.country_area == this.model) {
          let lng = data.geometry.coordinates[0];
          let ltd = data.geometry.coordinates[1];
          this.markers.push(
            new mapboxgl.Marker()
              .setLngLat([lng, ltd])
              .setPopup(
                new mapboxgl.Popup({ offset: 25 }).setHTML(
                  "<h3>" + data.properties.country_area + "</h3>"
                )
              )
              .addTo(this.map)
          );
        }
        if (this.model == "Todos") {
          let lng = data.geometry.coordinates[0];
          let ltd = data.geometry.coordinates[1];
          this.markers.push(
            new mapboxgl.Marker()
              .setLngLat([lng, ltd])
              .setPopup(
                new mapboxgl.Popup({ offset: 25 }).setHTML(
                  "<h3>" + data.properties.country_area + "</h3>"
                )
              )
              .addTo(this.map)
          );
        }
      });
    }
  },
  computed: {
    computedArray() {
      return this.data.filter(x =>
        this.model === "Todos" ? true : x.country_area === this.model
      );
    }
  },
  mounted() {
    this.getData();
    this.createMap();
  }
};
</script>

<style lang="scss"></style>
