const buttonToActivateEdit = document.getElementById('buttonToActivateEdit');
const buttonToSaveEditUserProfile = document.getElementById('buttonToSaveEditUserProfile');
const buttonToCancelEdit = document.getElementById('buttonToCancelEdit');

const buttonsContainerForEditing = document.getElementById('buttonsContainerForEditing');

const input_company_name = document.getElementById('input_company_name');
const input_social_link = document.getElementById('input_social_link');
const input_name = document.getElementById('input_name');

const nameForEdition = document.getElementById('nameForEdition');
const companyNameForEdition = document.getElementById('companyNameForEdition');
const socialLinkForEdition1 = document.getElementById('socialLinkForEdition1');

const userSocialLinkContainer = document.getElementById('userSocialLinkContainer');

const input_user_description = document.getElementById('input_user_description');
const userDescriptionForEdition = document.getElementById('userDescriptionForEdition');

const editUserProfileForm = document.getElementById('editUserProfileForm');

buttonToActivateEdit.addEventListener('click', (event) => {

  event.preventDefault();

  activateEditMode();

});

buttonToCancelEdit.addEventListener('click', (event) => {

  event.preventDefault();

  infoAlert();
  
});

buttonToSaveEditUserProfile.addEventListener('click', (event) => {

  event.preventDefault();

  Swal.fire({
    title: 'Cuidado',
    icon: 'warning',
    text: 'Esta seguro de que desea editar la informacion?',
    showCancelButton: true,
    confirmButtonText: 'Si',
  }).then((result) => {
    if (result.isConfirmed) {
      // Do all the proccess to send thew new user information
      editUserProfileForm.submit(); 
    } else {
      infoAlert();
    }
  });

});

function activateEditMode() {

  nameForEdition.style.display = 'none';
  companyNameForEdition.style.display = 'none';
  socialLinkForEdition1.style.display = 'none';
  userSocialLinkContainer.style.display = "none";

  input_company_name.style.display = 'block';
  input_social_link.style.display = 'block';
  input_name.style.display = 'block';

  buttonToCancelEdit.style.display = 'block';
  buttonsContainerForEditing.style.display = 'block';
  buttonToSaveEditUserProfile.style.display ='block';

  buttonToActivateEdit.style.display = 'none';

  input_user_description.style.display = 'block';
  userDescriptionForEdition.style.display = 'none';

}

function desactivateEditMode() {

  nameForEdition.style.display = 'block';
  companyNameForEdition.style.display = 'block';
  socialLinkForEdition1.style.display = 'block';
  userSocialLinkContainer.style.display = "block";

  input_company_name.style.display = 'none';
  input_social_link.style.display = 'none';
  input_name.style.display = 'none';

  buttonToCancelEdit.style.display = 'none';
  buttonsContainerForEditing.style.display = 'none';
  buttonToSaveEditUserProfile.style.display ='none';

  buttonToActivateEdit.style.display = 'block';

  input_user_description.style.display = 'none';
  userDescriptionForEdition.style.display = 'block';

}

function infoAlert() {

  Swal.fire('No se realizo ningun cambio', '', 'info');

  desactivateEditMode();

}

// Swal.fire({
//   title: 'Cuidado',
//   icon: 'warning',
//   text: 'Esta seguro de que desea eliminar este producto?',
//   showCancelButton: true,
//   confirmButtonText: 'Si',
// }).then((result) => {
//   if (result.isConfirmed) {
//     deleteProductEvent();
//   } else {
//     Swal.fire('No se realizo ningun cambio', '', 'info');
//   }
// });