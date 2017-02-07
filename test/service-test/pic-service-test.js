'use strict';

describe('Pic Service', function() {

  beforeEach( () => {
    angular.mock.module('cfgram');
    angular.mock.inject(( $rootScope, $log, authService, picService, $window, $httpBackend) => {
      $log = $log;
      this.$window = $window;
      this.$rootScope = $rootScope;
      this.authService = authService;
      this.picService = picService;
      this.$httpBackend = $httpBackend;
      this.$window.localStorage.setItem('token', 'test token');
      this.url = 'http://localhost:8000/api/gallery';
      this.headers = {
       'Authorization': 'Bearer test token',
       'Accept': 'application/json'
      };
    });
  });

describe('picService.uploadGalleryPic()', () => {
    var galleryData = {
    _id: '12345',
    name: 'test-name',
    pics: []
   }
   let picData = {
    name: 'testPicName',
    desc: 'testPicDesc',
    file: 'picData.file'
   }
   it('should upload pic', () => {
     this.$httpBackend.expectPOST(`${this.url}/${galleryData._id}/pic`, picData, this.headers).respond(200,{
      __v:0,
      _id: '123456789',
      created:Date.now(),
      desc: picData.desc,
      imageURI:`https://code-fellows.s3.amazonaws.com/123456789.jpg`,
      name:picData.name,
      objectKey:`123456789.jpg`,
      userID:'588fbaf88195bd19e4ee133e',
      username:'bhavyab'
     });

     this.picService.uploadGalleryPic(galleryData, picData);
     this.$httpBackend.flush();
     this.$rootScope.$apply();
   });
  });

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
