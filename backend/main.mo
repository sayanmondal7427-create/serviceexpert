import Map "mo:core/Map";
import Array "mo:core/Array";
import Nat "mo:core/Nat";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Iter "mo:core/Iter";

import MixinAuthorization "authorization/MixinAuthorization";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";
import AccessControl "authorization/access-control";


actor {
  include MixinStorage();

  // Authorization setup
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile Types
  public type UserProfile = {
    name : Text;
    mobile : Text;
    email : Text;
    profilePhoto : ?Storage.ExternalBlob;
  };

  public type ServiceCategory = {
    id : Nat;
    name : Text;
    description : Text;
    icon : ?Storage.ExternalBlob;
  };

  public type ApplianceService = {
    id : Nat;
    name : Text;
    description : Text;
    price : Nat;
    categoryId : Nat;
  };

  public type ContactInquiry = {
    name : Text;
    email : Text;
    message : Text;
  };

  // Storage Maps
  let userProfiles = Map.empty<Principal, UserProfile>();
  let serviceCategories = Map.empty<Nat, ServiceCategory>();
  let applianceServices = Map.empty<Nat, ApplianceService>();
  let contactInquiries = Map.empty<Nat, ContactInquiry>();
  var nextCategoryId = 1;
  var nextServiceId = 1;
  var nextContactId = 1;

  // User Profile Management
  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  // Service Category Management
  public shared ({ caller }) func addServiceCategory(name : Text, description : Text, icon : ?Storage.ExternalBlob) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add service categories");
    };

    let category : ServiceCategory = {
      id = nextCategoryId;
      name;
      description;
      icon;
    };
    serviceCategories.add(nextCategoryId, category);
    nextCategoryId += 1;
  };

  public query func getAllServiceCategories() : async [ServiceCategory] {
    // Public read access - no authorization needed for viewing service categories
    serviceCategories.values().toArray();
  };

  // Appliance Service Management
  public shared ({ caller }) func addApplianceService(name : Text, description : Text, price : Nat, categoryId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add appliance services");
    };

    let service : ApplianceService = {
      id = nextServiceId;
      name;
      description;
      price;
      categoryId;
    };
    applianceServices.add(nextServiceId, service);
    nextServiceId += 1;
  };

  public shared ({ caller }) func addMultipleApplianceServices(services : [(Text, Text, Nat, Nat)]) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add appliance services");
    };

    for ((name, description, price, categoryId) in services.values()) {
      let service : ApplianceService = {
        id = nextServiceId;
        name;
        description;
        price;
        categoryId;
      };
      applianceServices.add(nextServiceId, service);
      nextServiceId += 1;
    };
  };

  public query func getServicesByCategory(categoryId : Nat) : async [ApplianceService] {
    // Public read access - no authorization needed for viewing services
    let servicesArray = applianceServices.values().toArray();
    servicesArray.filter(
      func(service) {
        service.categoryId == categoryId;
      }
    );
  };

  public query func getAllApplianceServices() : async [ApplianceService] {
    // Public read access - no authorization needed for viewing services
    applianceServices.values().toArray();
  };

  // Contact Inquiry Submission
  public shared func submitContactInquiry(name : Text, email : Text, message : Text) : async () {
    // Public access - anyone including guests can submit contact inquiries
    let inquiry : ContactInquiry = {
      name;
      email;
      message;
    };
    contactInquiries.add(nextContactId, inquiry);
    nextContactId += 1;
  };

  public query ({ caller }) func getAllContactInquiries() : async [ContactInquiry] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view contact inquiries");
    };
    contactInquiries.values().toArray();
  };

  // Profile Photo Upload
  public shared ({ caller }) func uploadProfilePhoto(photo : Storage.ExternalBlob) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can upload profile photos");
    };
    switch (userProfiles.get(caller)) {
      case (null) {
        Runtime.trap("User profile not found");
      };
      case (?profile) {
        let updatedProfile : UserProfile = {
          profile with
          profilePhoto = ?photo;
        };
        userProfiles.add(caller, updatedProfile);
      };
    };
  };

  public query ({ caller }) func getUserProfilePhoto(user : Principal) : async ?Storage.ExternalBlob {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile photo");
    };
    switch (userProfiles.get(user)) {
      case (null) { null };
      case (?profile) { profile.profilePhoto };
    };
  };

  // Service Category Initialization
  public shared ({ caller }) func initializeServiceCategories(categories : [(Text, Text, ?Storage.ExternalBlob)]) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can initialize service categories");
    };

    for ((name, description, icon) in categories.values()) {
      let category : ServiceCategory = {
        id = nextCategoryId;
        name;
        description;
        icon;
      };
      serviceCategories.add(nextCategoryId, category);
      nextCategoryId += 1;
    };
  };
};
