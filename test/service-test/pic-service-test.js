'use strict';

describe('Pic Service', function() {

 beforeEach( () => {
  angular.mock.module('cfgram');
  angular.mock.inject(( $rootScope, $log, authService, picService, Upload, $window, $httpBackend) => {
    this.$window = $window;
    this.$rootScope = $rootScope;
    this.authService = authService;
    this.picService = picService;
    this.$httpBackend = $httpBackend;
    this.upload = Upload,
    this.$window.localStorage.setItem('token', 'test token');
    this.url = 'http://localhost:8000/api/gallery';
    this.headers = {
      'Authorization': 'Bearer test token',
      'Accept': 'application/json'
    };
  });
 });

  // describe('picService.uploadGalleryPic()', () => {
  //   var galleryData = {
  //     _id: '12345',
  //     name: 'test-name',
  //     pics: []
  //   };
  //   let picData = {
  //     name: 'testPicName',
  //     desc: 'testPicDesc',
  //     file: 'picData.file'
  //   };
  //   it('should upload pic', () => {
  //     this.$httpBackend.expect('POST',`${this.url}/${galleryData._id}/pic`, this.headers).respond(200);
  //     this.picService.uploadGalleryPic(galleryData, picData);
  //     this.$httpBackend.flush();
  //     this.$rootScope.$apply();
  //   });
  // });


  describe('picService.deleteGalleryPic()', () => {
    var galleryData = {
      _id: '12345',
      name: 'test-name',
      pics: [{
        _id: '123458',
        name: 'testPicName',
        desc: 'testPicDesc',
        file: 'picData.file'
      }]
    };
    it('should delete pic', () => {
      this.$httpBackend.expectDELETE(`${this.url}/${galleryData._id}/pic/123458`, this.headers).respond(204);

      this.picService.deleteGalleryPic(galleryData, 123458);
      this.$httpBackend.flush();
      this.$rootScope.$apply();
    });
  });

});
