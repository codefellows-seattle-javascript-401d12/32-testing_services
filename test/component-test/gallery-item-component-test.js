'use strict';

describe('Gallery Item Component', function(){
  beforeEach( () => {
    angular.mock.module('cfgram');
    angular.mock.inject(($rootScope,$componentController, $httpBackend, $window, $log, galleryService) => {
      this.$rootScope = $rootScope;
      this.$window = $window;
      this.$componentController = $componentController;
      this.$httpBackend = $httpBackend;
      this.url = 'http://localhost:8000/api/gallery';
      this.headers = {
        Authorization: 'Bearer test token',
        Accept: 'application/json, text/plain, */*'
      };
      this.$window.localStorage.setItem('token', 'test token');
      this.galleryService = galleryService;
    });
  });

  describe('galleryItemCtrl.deleteGallery()', () => {
    it('should call galleryItemCtrl.deleteGallery()', () => {
      let mockBindings = {
        gallery: {
          _id: '12345',
          name: 'test name',
          desc: 'test description',
          pics: []
        }
      };

      this.$httpBackend.expectDELETE(`${this.url}/12345`, this.headers).respond(204);

      let galleryItemCtrl = this.$componentController('galleryItem', null, mockBindings);
      galleryItemCtrl.deleteGallery();
      this.$httpBackend.flush();
      this.$rootScope.$apply();
    });
  });
});
