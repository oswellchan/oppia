// Copyright 2014 The Oppia Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Directive for creating image links to a user's profile page.
 *
 * @author raine@stanford.edu (Raine Hoover)
 */

oppia.directive('profileLinkImage', [function() {
  return {
    restrict: 'E',
    scope: {
      username: '&'
    },
    templateUrl: 'components/profileLinkImage',
    controller: ['$scope', '$http', function($scope, $http) {
      var DEFAULT_PROFILE_IMAGE_PATH = '/images/avatar/user_blue_72px.png';

      $scope.isUsernameLinkable = function(username) {
        return GLOBALS.SYSTEM_USERNAMES.indexOf(username) == -1;
      };

      $scope.profileImageUrl = (
        '/preferenceshandler/profile_picture_by_username/' + $scope.username());
      $scope.profilePicture = DEFAULT_PROFILE_IMAGE_PATH;

      // Returns a promise for the user profile picture, or the default image if
      // user is not logged in or has not uploaded a profile picture, or the
      // player is in preview mode.
      $http.get($scope.profileImageUrl).success(function(data) {
        $scope.profilePicture = (
          data.profile_picture_data_url_for_username ||
          DEFAULT_PROFILE_IMAGE_PATH);
      });
    }]
  };
}]);
