/**
* @module rtv-mood tracker
* @submodule Question
*/
import React from 'react';
const update = require('react-addons-update');

let BodyImage = React.createClass({
  getDefaultProps: function() {
    return {
       body: {
        head: ['eins'],
        left_arm: ['zwei'],
        right_arm: ['drei'],
        chest: [],
        left_leg: [],
        right_leg: [],
        hip: []
      }
    }
  },
  fillColor: function(key) {
    return this.props.body[key].length > 0 ? 'red' : '#FAFAFA'
  },
  render() {
    var that = this
    return (
      <div id="body-image-container">
        <svg version="1.1" id="body-image" viewBox="0 0 180 380">
          <g id="body">
            <path fill="#FAFAFA" stroke="#D9D9D9" stroke-linejoin="round" stroke-miterlimit="10" d="M110.322,58.942
              c0.967-1.495,2.475-2.911,3.287-3.942c6.469-8.219,6.261-21.638,0.385-33.235c-3.924-7.743-12.24-10.77-21.643-8.521
              c-6.901,1.648-11.021,7.979-11.915,16.311C79.574,37.6,78.869,45.364,86.609,51c0.195,0.129,0.39,0.363,0.561,0.518l0,0
              c3.637,3.262,1.818,11.636-2.555,14.528c-0.756,0.5-1.78,1.178-2.66,1.29l-5.459,1.011l-5.512,1.35
              c-2.782,0.31-7.127,1.849-7.127,1.849c-3,1.637-4.895,4.296-6.614,8.255c-5.255,12.099-9.19,24.285-11.969,37.2
              c-0.231,1.082-0.279,2.736-0.582,3.736l0.05,0.018c-0.351,1.137-0.845,2.211-1.711,3.129c-7.916,8.386-12.556,18.559-16.591,29.193
              c-0.911,2.401-1.452,4.793-2.592,7.076c-0.084,0.16-0.168,0.32-0.252,0.479c-2.223,4.175-4.913,8.107-8.245,11.698
              c-5.224,5.628-4.668,14.869,0.52,20.768c2.613,2.973,4.633,3.593,8.189,0.205c6.012-5.723,7.869-13.485,9.361-20.468
              c0.451-2.11,1.042-4.067,1.76-5.915c1.692-3.73,3.719-7.927,6.366-11.199c2.819-3.483,5.708-6.912,8.566-10.362l9.771-14.627
              l0.838-3.276l0.116,0.048l5.888-23.507l0.011,0.208c0.633,5.361,3.61,15.329,3.61,15.329l0.664,7.794L71.068,129l1.666,18.435
              C71.637,154.627,70.839,159,70.142,167l-0.17,2c-0.937,9.662-1.371,18.42-1,28.083l-0.257-0.063l0.257,0.063
              c0.013,0.338,0.019,0.668,0.034,1.008l0.041,0.01c0.005,0.128,0.009,0.255,0.016,0.383c1.012,19.416,3.399,38.513,7.479,57.516
              c2.465,11.479-1.288,23.271,0.687,34.829c1.764,10.322,1.683,22.098,1.662,32.638C78.873,331.87,75.418,339,75.876,339
              c-2.812,6-7.668,10.641-14.296,14.444c-4.152,2.383-8.156,4.287-12.227,6.815c-1.447,0.898-3.045,1.854-2.533,3.896
              c0.539,2.162,2.373,3.174,4.369,3.133c6.221-0.126,12.572,0.312,18.613-0.865c5.218-1.019,10.325-1.828,15.625-1.584
              c4.832,0.223,7.721-1.83,7.155-6.439C91.77,351.767,91.665,345,92.059,339c1.028-17,5.45-34.101,9.449-50.584
              c2.641-10.886-1.833-22.152-3.351-32.416c-0.218-1.466-0.373-2.812-0.44-4.297c-0.479-10.653,0.934-16.607,3.283-27.099
              c5,11.872,9.746,31.396,9.746,31.396c1.277,6,2.675,14.405,3.078,21.296c0.678,11.563-0.916,16.187,3.342,26.99
              c3.887,9.863,5.793,21.018,7.648,31.419c0.041,0.236,0.162,0.287,0.184,1.615c-0.143,4.336-2.098,8.358-2.639,12.63
              c-0.711,5.606,0.361,10.146,5.75,12.646c4.166,1.933,14.687-1.443,17.014-5.094c1.561-2.45,2.043-5.188,0.299-7.455
              c-3.162-4.11-5.288-7.558-6.744-12.048c-3.775-12-3.039-24.459-4.238-36.674c-1.26-12.851,6.148-19.726,2.506-32.202
              c-1.129-3.869-2.2-10.124-2.781-13.124c-1.796-13-1.618-23.065-1.575-35.164c0.026-7.42,0.341-16.006-0.79-23.282
              c0,0-1.08-4.146-1.611-6.496c-1.73-7.657-3.388-15.882-1.939-24.059c1.025-5.798-0.604-11.459-4.253-16.663
              c-4.558-6.499-6.415-14.213-11.138-20.675c-0.528-0.723-0.735-1.953-0.855-2.662c0,0,0.432-3.503,1.4-5.625
              c2.871-6.276,6.852-15.651,8.629-23.208c5,7.184,12.583,14.989,16.809,23.408c0,0,2.313,1.98,2.885,4.021
              c2.262,8.065,3.285,17.586,7.811,24.829c2.227,3.563,3.595,9.437,3.967,13.575c0.075,3.555-0.677,7.172-2.206,10.916
              c-1.342,3.285-1.735,6.961-2.508,10.471c-0.647,2.947-1.174,5.831,3.01,6.7c2.429,0.503,2.138,2.87,2.832,4.571
              c2.711,6.628,5.423,7.204,10.222,1.771c6.693-7.581,7.313-16.526,4.438-25.723c-0.901-2.881-2.683-5.796-3.354-8.707
              c-1.021-4.399-1.564-16.982-1.525-22.722c0.068-10.301-5.696-17.357-10.669-25.45c0,0-3.286-5.345-4.671-8.16
              C143.688,96.74,133.527,73.008,130.609,70C128.882,68.221,125,66.64,121,65.83c-1-0.461-5.234,0.669-6.135,0.699
              c-1.913-0.027-3.021-0.607-4.158-1.796c-0.178-0.188-0.467-0.871-0.627-1.102C109.045,62.146,109.426,60.332,110.322,58.942"/>
          </g>

          <path id="hip" className="body-part" fill={this.fillColor('hip')} stroke="#D9D9D9" stroke-linejoin="round" stroke-miterlimit="10" d="M123.373,179.136
            c-0.042-3.337-2.79-4.637-6.127-4.637H117H79.142c-2.739,0-4.855-1.303-6.296-1.176c-0.303,4.659-0.843,12.818-0.842,16.519
            c0,3.366,3.095,6.675,6.621,7.437l12.443,2.531c2.135,0.461,5.035,0.639,8.166,0.639c3.615,0,7.095-0.374,9.545-0.966l11.357-2.755
            c2.988-0.723,4.799-1.875,5.497-2.516l-0.351-0.89C123.48,185.348,123.377,179.415,123.373,179.136z"/>

          <path id="left-arm" className="body-part" fill={this.fillColor('left_arm')} stroke="#D9D9D9" stroke-linejoin="round" stroke-miterlimit="10" d="M164.469,174.573
            l-0.832-2.663c-0.302-0.632,0.342-0.104-0.302-0.632c-0.329-1.955-3.06-12.359-3.254-14.332c-0.007-0.13-0.003-0.249-0.015-0.382
            c-0.028-0.324-0.7-7.983-0.66-13.844c0.059-8.848-5.338-15.55-5.381-15.616c-0.159-0.235-8.539-13.941-8.539-13.941
            c-0.045-0.084-1.321-3.055-1.321-3.055c-1.644-3.336-3.697-7.813-5.906-12.549c-4.118-8.833-10.327-22.181-12.054-24.119
            l-0.955-0.992c-0.719-0.205-1.385-0.394-2.001-0.567c0.063,1.354,0.14,2.904,0.22,4.592l0.581,12.188
            c0.218,4.58,3.037,11.609,6.034,15.043c3.164,3.625,4.682,7.051,5.264,8.611c0.629,0.728,1.393,1.375,2.215,1.917
            c1.15,1.404,6,7.43,6.783,10.199c-0.023,0.015-0.055,0.031-0.076,0.047l0.305,1.085c0.679,2.42,1.252,5.003,1.807,7.501
            c1.318,5.938,2.682,12.082,5.545,16.665c2.653,4.248,2.852,5.474,2.926,5.935c0.176,1.088,0.476,2.039,0.828,2.864l-0.063,0.024
            c1.407,4.378,1.057,10.126,0.938,11.59c-0.389,0.581-0.675,1.292-0.748,2.079l-0.057,0.589l-0.225,0.548l-1.528,3.743
            c-0.806,1.969-1.229,4.245-1.679,6.654c-0.192,1.03-0.393,2.097-0.627,3.161c-0.094,0.429-0.283,1.295-0.336,1.866
            c0.072,0.021,0.156,0.04,0.254,0.06c4.291,0.89,5.139,4.568,5.5,6.14c0.07,0.304,0.158,0.683,0.222,0.836
            c0.599,1.465,1.069,2.27,1.371,2.697c0.422-0.302,1.12-0.897,2.149-2.063C166.049,190.565,167.232,183.408,164.469,174.573z"/>
          <path id="right-arm" className="body-part" fill={this.fillColor('right_arm')} stroke="#D9D9D9" stroke-linejoin="round" stroke-miterlimit="10" d="M61.237,94.838
            l-0.627-12.4c-0.028-0.56-0.058-1.097-0.088-1.611l-0.538,1.239c-4.874,11.22-8.534,22.347-11.187,33.922
            c-0.016,0.057-0.038,0.105-0.052,0.166C47.902,119.689,44.299,128,44.299,128l0.002,0.008c-7.068,7.777-11.348,17.301-14.876,26.526
            c-0.002,0.006-0.006,0.011-0.008,0.019c-0.958,2.457-7.482,14.842-7.826,15.493c-1.623,2.386-3.38,4.599-5.308,6.676
            c-3.668,3.951-3.403,10.861,0.591,15.403c0.519,0.589,0.859,0.894,1.057,1.045c0.244-0.139-0.201-0.443,0.482-1.094
            c4.716-4.489,5.086-10.501,7.086-17.333c0-0.001,0-0.002,0-0.003c0-3.05,6-15.738,6-15.738v-0.008c0-0.342,1.536-0.705,1.752-1.113
            c0.223-0.421,0.761-0.43,3.652-4.005l3.087-3.484l0.153-0.024l0.086-0.024c3.091-3.698,7.779-9.911,10.409-13.849
            c1.691-2.533,2.4-4.761,3.251-6.264C55.659,127.266,56.5,119,56.5,119v-0.003c0-0.451,1.091-0.951,1.228-1.498l1.369-4.147
            C60.336,108.408,61.495,99.93,61.237,94.838z"/>
          <path id="head" className="body-part" fill={this.fillColor('head')} stroke="#D9D9D9" stroke-linejoin="round" stroke-miterlimit="10" d="M109.426,24.243
            c-2.305-4.548-6.63-7.053-12.179-7.053c-1.589,0-3.261,0.207-4.965,0.614c-6.938,1.656-8.512,9.534-8.867,12.845
            c-0.685,6.389,1,10.117,1.107,10.345c1.854,3.532,3.295,6.214,4.064,7.61c0.037,0.013,0.085,0.029,0.125,0.043
            c0.817,1.229,1.763,2.383,3.458,4.549c2.501,3.198-0.677,13.107-6.346,16.856l-0.755,0.5l-0.32,0.211l-0.354,0.146
            c-1.257,0.521-3.272,1.165-4.689,1.496c-0.146,0.034-0.304,0.076-0.467,0.122c0.461,1.232,1.227,2.961,2.384,5.045l0.229,0.413
            c2.123,3.825,6.941,6.684,9.833,6.684c2.971,0,8.108-2.811,10.534-6.571l3.003-4.657c1.285-1.994,1.98-3.588,2.287-4.55
            l-0.691-0.725c-0.51-0.537-0.81-1.122-1.049-1.593c-0.021-0.04-0.039-0.08-0.059-0.116l-0.945-1.356L103.994,64l0,0
            c-0.212-0.309-0.288-0.702-0.271-1.147l0.006-0.015c-0.002-0.001-0.004-0.003-0.006-0.005c0.131-2.737,4.008-7.577,5.312-9.128
            c0.012-0.002,0.028-0.004,0.038-0.007l0.394-0.5C114.789,46.435,114.773,34.798,109.426,24.243z"/>
          <path id="chest" className="body-part" fill={this.fillColor('chest')} stroke="#D9D9D9" stroke-linejoin="round" stroke-miterlimit="10" d="M119.718,153.389
            c-2.427-3.461-4.108-7.181-5.735-10.736c-1.203-2.628-2.357-5.125-3.758-7.455l0,0c-3.754-7.447,0.09-18.505,0.1-18.531
            c1.91-4.829,3.361-9.406,3.38-9.466c1.517-4.797,2.595-13.115,2.356-18.145l-0.58-12.205c-0.074-1.549-0.137-2.862-0.188-3.976
            c-1.116,1.811-2.394,3.87-3.366,5.437l-3.092,4.977c-3.617,5.823-11.15,10.384-17.15,10.384c-6.092,0-13.45-4.785-16.751-10.895
            l-0.422-0.781c-1.817-3.361-3.324-5.824-4.211-7.153c-0.712,0.067-1.493,0.178-2.054,0.278c0.091,1.817,0.217,4.329,0.355,7.081
            l0.633,12.629c0.284,5.648,1.815,17.285,2.464,19.484c0.9,3.05,1.778,7.574,1.999,10.248c0.005,0.066,0.012,0.471,0.018,0.547
            l0.587,7.209c0.15,1.768,0.354,3.85,0.586,6.417c0.488,5.399-0.582,20.99-1.019,24.657c0.248,0.529,2.08,3.106,5.275,3.106h38.104
            c1.552,0,2.976-2.008,4.007-3.096c0.943-0.995,1.462-3.08,1.48-4.481C122.523,158.413,121.818,156.384,119.718,153.389z"/>
          <path id="left-leg" className="body-part" fill={this.fillColor('left_leg')} stroke="#D9D9D9" stroke-linejoin="round" stroke-miterlimit="10" d="M141.252,353.158
            l-3.162-4.109l-0.283-0.369c0,0-5.183-17.606-5.332-18.811c-0.018-0.146-1.824-15.287-3.016-27.413
            c-0.637-6.485,0.698-11.65,1.875-16.187c1.323-5.101,2.467-9.525,0.771-15.332l-1.131-3.85l-0.06-0.165l-0.038,0.12
            c-0.152-0.852-0.527-0.87-1.059-1.576l-1.332-15.968h-0.021c0.02,0,0.026-1.346,0.008-1.626c-0.039-0.541-0.929-13.888-0.886-25.995
            c0.024-7.225-0.269-13.21-0.271-13.268c-0.129-2.5-1.703-4.21-4.01-4.211c-0.416,0-0.851,0.008-1.289,0.114l-11.357,2.724
            c-3.549,0.857-6.66,4.712-6.66,8.257c0,4.955,1.26,13.207,2.757,18.082l4.386,12.052l0.075,0.247l0.054,0.547
            c0.125,0.516,0.321,1.028,0.566,1.531c0,0,3.077,13.996,3.666,17.953c0.037,0.197,0.9,4.849,1.313,11.909
            c0.195,3.315,0.209,6.07,0.221,8.51c0.029,6.1,0.05,10.154,2.852,17.263c3.893,9.883,5.811,21.975,7.664,32.389l0.021,1.521h0.104
            c0.02,0,0.038-0.009,0.059-0.009c0.031,2.364-0.282,4.45-0.282,4.45c-0.294,1.459-0.642,2.858-1.026,4.233
            c-0.484,1.731-0.921,3.368-1.121,4.949c-0.688,5.432,0.827,7.284,3.478,8.516c0.017,0.007,0.431,0.189,1.489,0.189
            c4.316,0,9.674-2.553,10.477-3.807C141.561,354.747,141.732,353.782,141.252,353.158z"/>
          <path id="right-leg" className="body-part" fill={this.fillColor('right_leg')} stroke="#D9D9D9" stroke-linejoin="round" stroke-miterlimit="10" d="M96.532,270.154
            C96.532,270.153,96.532,270.153,96.532,270.154c-0.933-7.325-3.869-19.328-3.888-19.404c-0.242-9.599-0.117-15.873,2.019-25.398
            l-1.162-9.68c0-3.658-1.866-7.598-5.417-8.475l-12.245-3.141l-3.866-0.701c1.047,16.892,3.3,33.334,6.466,48.991
            c0.009,0.048,0.073,0.089,0.083,0.137c1.211,6.323,0.587,13.333,0.455,14.59c-0.007,0.073-0.004,0.144-0.008,0.218
            c-0.007,0.128-0.871,12.703,1.001,23.661c1.769,10.354,1.532,21.991,1.532,32.313v0.912l0.179,8.389l0.096,0.796
            c-1.128,2.612-4.522,11.138-4.522,11.138c-3.145,5-7.963,9.63-14.705,13.499c-1.73,0.993-3.42,1.615-5.067,2.496
            c-2.205,1.181-4.292,2.237-6.396,3.515c0.729-0.01,1.452-0.043,2.173-0.043c0.594,0,1.19-0.015,1.786-0.013
            c0.588,0.002,1.177-0.003,1.765-0.003c3.673,0,7.566-0.063,11.231-0.776c4.531-0.885,9.42-1.702,14.463-1.702
            c0.709,0,1.419,0.018,2.111,0.049c0.173,0.009,0.343,0.017,0.509,0.017c1.51,0,2.208-0.326,2.366-0.506
            c0.092-0.104,0.238-0.521,0.126-1.432c-0.826-6.728-0.787-9.626-0.78-9.939c-0.079-2.58,1.854-20.453,1.854-20.453
            c0.039-0.243,3.943-24.531,7.934-40.979C98.316,281.234,97.271,273.832,96.532,270.154z"/>

          <polygon
            id="touch-right-arm"
            className="touch-area"
            fill="black"
            opacity="0.0"
            pointer-events="all"
            points="68,64 28,64 28,119 22,119 22,159 2,159 2,199 62,199 62,168 62,159 62,128
            68,128 "
            onClick={this.props.openBodyModal.bind(null,'right_arm')} />
          <polygon
            id="touch-left-arm"
            className="touch-area"
            fill="black"
            opacity="0.0"
            pointer-events="all"
            points="178,163 178,115 160,115 160,64 118,64 118,123 138,123 138,163 138,165 138,203
            180,203 180,163 "
            onClick={this.props.openBodyModal.bind(null, 'left_arm')} />
          <polygon
            id="touch-left-leg"
            className="touch-area"
            fill="black"
            opacity="0.0"
            pointer-events="all"
            points="148,336 148,255 140,255 140,204 100,204 100,257 108,257 108,336 108,338
            108,376 155,376 155,336"
            onClick={this.props.openBodyModal.bind(null, 'left_leg')} />
          <polygon
            id="touch-right-leg"
            className="touch-area"
            fill="black"
            opacity="0.0"
            pointer-events="all"
            points="102,255 102,203 62,203 62,257 68,257 68,336 43,336 43,376 108,376 108,338
            108,336 108,255"
            onClick={this.props.openBodyModal.bind(null, 'right_leg')} />
          <polygon
            id="touch-head"
            className="touch-area"
            fill="black"
            opacity="0.0"
            pointer-events="all"
            points="128,3 71,3 71,49 68,49 68,89 118,89 118,64 128,64 "
            onClick={this.props.openBodyModal.bind(null, 'head')} />
          <polygon
            id="touch-chest"
            className="touch-area"
            fill="black"
            opacity="0.0"
            pointer-events="all"
            points="124,123 124,64 118,64 118,89 68,89 68,64 63,64 63,123 62,123 62,167 138,167
            138,123"
            onClick={this.props.openBodyModal.bind(null, 'chest')} />
          <polygon
            id="touch-hip"
            className="touch-area"
            opacity="0.0"
            pointer-events="all"
            points="73.4988 173.97 123.474 173.499 125.831 194.715 125.36 194.715 98.4864 201.787 72.0844 199.429 73.9702 174.913"
            onClick={this.props.openBodyModal.bind(null, 'hip')}
          />
        </svg>
      </div>
    )
  }
});

module.exports = BodyImage