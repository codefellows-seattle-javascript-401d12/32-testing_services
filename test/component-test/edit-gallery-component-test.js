'use strict';

describe('Edit Gallery Component', function(){
  beforeEach( () => {
    angular.mock.module('cfgram');
    angular.mock.inject(($rootScope,$componentController, $httpBackend, $window, $log, galleryService) => {
      this.$rootScope = $rootScope;
      this.$window = $window;
      this.$componentController = $componentController;
      this.$httpBackend = $httpBackend;
      this.galleryService = galleryService;

      this.url = 'http://localhost:8000/api/gallery';
      this.headers = {
        Authorization: 'Bearer test token',
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      };
      this.$window.localStorage.setItem('token', 'test token');
    });
  });

  describe('editGalleryCtrl.updateGallery()', () => {
    it('should call editGalleryCtrl.updateGallery()', () => {
      let mockBindings = {
        gallery: {
          _id: '12345',
          name: 'test name',
          desc: 'test description',
          pics: []
        },

        data:{
          name: 'updateGallery'
        }
      };
      this.$httpBackend.expectPUT(`${this.url}/${mockBindings.gallery._id}`, mockBindings.gallery, this.headers).respond(200);

      let editGalleryCtrl = this.$componentController('editGallery', null, mockBindings);

      editGalleryCtrl.updateGallery(mockBindings.gallery._id, mockBindings.gallery);
      this.$httpBackend.flush();
      this.$rootScope.$apply();
    });
  });
});
