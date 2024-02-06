<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="w-full max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-14">
      <div class="min-h-[600px]">
        <transition name="fade" mode="out-in">
          <div v-if="!formSubmittedSuccessfully" key="form" class="transition-opacity">
            <h2 class="text-5xl text-center mb-8 pt-10">Registration Form</h2>
            <form @submit.prevent="handleSubmit" class="space-y-6">
              <div class="grid grid-cols-1 gap-6 ">
                <!--  Email input -->
                <div class="relative">
                  <label :class="[
                    'absolute left-4 transition-all ease-in-out duration-300',
                    (form.email.length > 0 || isFocusedEmail) ? 'text-xs top-2' : 'text-medium top-4',
                    isFocusedEmail ? 'text-gray2' : 'text-gray2'
                  ]" for="email">
                    Email
                  </label>
                  <input v-model="form.email" @focus="isFocusedEmail = true" @blur="isFocusedEmail = false" type="email"
                    id="email" :class="[
                      'w-full rounded-xl pt-6 pb-2 px-4 placeholder-gray2  focus:outline-none focus:border-transparent focus:border-b-2 focus:border-b-indigo-500 hover:border-0.5 hover:border-gray-300',
                      (form.email.length > 0 && !isFocusedEmail) ? 'bg-white shadow-lg' : 'bg-gray1',
                      v$.email.$error ? 'border-red-600 border-0.5' : ''

                    ]" />
                  <span v-if="v$.email.$error" class="text-red-600 text-xs px-4 pt-2">Invalid Email address</span>
                </div>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!--  First name input -->
                <div class="relative">
                  <label :class="[
                    'absolute left-4 transition-all ease-in-out duration-300',
                    (form.first_name.length > 0 || isFocusedFirstName) ? 'text-xs top-2' : 'text-medium top-4',
                    isFocusedFirstName ? 'text-gray2' : 'text-gray2'
                  ]" for="first_name">
                    First Name
                  </label>
                  <input v-model="form.first_name" @focus="isFocusedFirstName = true" @blur="isFocusedFirstName = false"
                    type="text" id="first_name" :class="[
                      'w-full rounded-xl pt-6 pb-2 px-4 placeholder-gray2 focus:outline-none focus:border-transparent focus:border-b-2 focus:border-b-indigo-500 hover:border-0.5 hover:border-gray-300',
                      (form.first_name.length > 0 && !isFocusedFirstName) ? 'bg-white shadow-lg' : 'bg-gray1',
                      v$.first_name.$error ? 'border-red-600 border-0.5' : ''
                    ]" />
                  <span v-if="v$.first_name.$error" class="text-red-600 text-xs px-4 pt-2">Invalid First Name</span>
                </div>
                <!--  Second name input -->
                <div class="relative">
                  <label :class="[
                    'absolute left-4 transition-all ease-in-out duration-300',
                    (form.second_name.length > 0 || isFocusedSecondName) ? 'text-xs top-2' : 'text-medium top-4',
                    isFocusedSecondName ? 'text-gray2' : 'text-gray2'
                  ]" for="second_name">
                    Second Name
                  </label>
                  <input v-model="form.second_name" @focus="isFocusedSecondName = true"
                    @blur="isFocusedSecondName = false" type="text" id="second_name" :class="[
                      'w-full rounded-xl pt-6 pb-2 px-4 placeholder-gray2 focus:outline-none focus:border-transparent focus:border-b-2 focus:border-b-indigo-500 hover:border-0.5 hover:border-gray-300',
                      (form.second_name.length > 0 && !isFocusedSecondName) ? 'bg-white shadow-lg' : 'bg-gray1',
                      v$.second_name.$error ? 'border-red-600 border-0.5' : ''
                    ]" />
                  <span v-if="v$.second_name.$error" class="text-red-600 text-xs px-4 pt-2">Invalid Second Name</span>
                </div>
                <!--  Lang input -->
                <div class="relative">
                  <label :class="[
                    'absolute left-4 transition-all ease-in-out duration-300',
                    (form.lang.length > 0 || isFocusedLang) ? 'text-xs top-2' : 'text-base top-4',
                    'text-gray2',
                    'z-10'
                  ]" for="lang">Language</label>
                  <input readonly v-model="form.lang" @click="toggleDropdownLangs" @focus="isFocusedLang = true"
                    @blur="isFocusedLang = false" type="text" id="lang" :class="[
                      'w-full rounded-xl pt-6 pb-2 px-4 pr-10 placeholder-gray-300 focus:outline-none focus:border-transparent focus:border-b-2 hover:border-0.5 hover:border-gray-300 focus:bg-white focus:shadow-md focus:rounded-b-none',
                      form.lang.length > 0 ? 'bg-white shadow-lg' : 'bg-gray1',
                      'cursor-pointer',
                      v$.lang.$error ? 'border-red-600 border-0.5' : '',
                      'relative'
                    ]" />

                  <!-- Arrow Icon  -->
                  <span :style="{ fontSize: '12px', top: v$.lang.$error ? '30%' : '45%' }" :class="[
                    'absolute right-5 flex items-center pointer-events-none text-gray2',
                    showDropdownCountries ? 'fa fa-chevron-up' : 'fa fa-chevron-down'
                  ]"></span>
                  <div v-show="showDropdownLangs"
                    class="dropdown-menu absolute z-10 w-full bg-white rounded-md shadow-lg">
                    <div v-for="(lang, index) in langs" :key="index" class="px-4 py-4 hover:bg-gray-100 cursor-pointer"
                      @click="selectLang(lang)">
                      <span :class="lang.code"></span><span class="px-5 text-gray2 text-sm">{{ lang.name }}</span>
                    </div>
                  </div>
                  <span v-if="v$.lang.$error" class="text-red-600 text-xs px-4 pt-2">Language is required</span>

                </div>

                <!--  Country input -->
                <div class="relative">
                  <label :class="[
                    'absolute left-4 transition-all ease-in-out duration-300',
                    (form.country.length > 0 || isFocusedCountry) ? 'text-xs top-2' : 'text-base top-4',
                    'text-gray2',
                    'z-10'
                  ]" for="country">Country</label>


                  <input readonly v-model="form.country" @click="toggleDropdownCountries" @focus="isFocusedCountry = true"
                    @blur="isFocusedCountry = false" type="text" id="country" :class="[
                      'w-full rounded-xl pt-6 pb-2 px-4 pr-10 placeholder-gray-300  focus:outline-none focus:border-transparent focus:border-b-2 hover:border-0.5 hover:border-gray-300  focus:bg-white focus:shadow-md focus:rounded-b-none',
                      form.country.length > 0 ? 'bg-white shadow-lg' : 'bg-gray1',
                      'cursor-pointer',
                      v$.country.$error ? 'border-red-600 border-0.5' : '',
                      'relative'
                    ]" />

                  <!-- Arrow Icon -->
                  <span :style="{ fontSize: '12px', top: v$.country.$error ? '30%' : '45%' }" :class="[
                    'absolute right-5 flex items-center pointer-events-none text-gray2',
                    showDropdownCountries ? 'fa fa-chevron-up' : 'fa fa-chevron-down'
                  ]"></span>

                  <div v-show="showDropdownCountries"
                    class="dropdown-menu absolute z-10 w-full bg-white  rounded-md shadow-lg">
                    <div v-for="(country, index) in countries" :key="index"
                      class="px-4 py-4 hover:bg-gray-100 cursor-pointer" @click="selectCountry(country)">
                      <span class="text-gray2 text-sm pt-5">{{ country }}</span>
                    </div>
                  </div>
                  <span v-if="v$.country.$error" class="text-red-600 text-xs px-4 pt-2">Country is required</span>
                </div>
                <!--  Password input -->
                <div class="relative">
                  <label
                    :class="['absolute left-4 transition-all ease-in-out duration-300 text-gray2', (form.password.length > 0 || isFocusedPassword) ? 'text-xs top-2' : 'text-medium top-4', isFocusedPassword ? 'text-gray-700' : 'text-gray-700']"
                    for="password">
                    Password
                  </label>
                  <input v-model="form.password" :type="isPasswordVisible ? 'text' : 'password'"
                    @focus="isFocusedPassword = true" @blur="isFocusedPassword = false" id="password"
                    :class="['w-full rounded-xl pt-6 pb-2 px-4 placeholder-gray-500  focus:outline-none focus:border-transparent focus:border-b-2 focus:border-b-indigo-500 hover:border-0.5 hover:border-gray-300', (form.password.length > 0 && !isFocusedPassword) ? 'bg-white shadow-lg' : 'bg-gray-100', v$.password.$error ? 'border-red-600 border-0.5' : '']" />
                  <button type="button" @click="isPasswordVisible = !isPasswordVisible"
                    class="absolute inset-y-0 right-0 flex items-center pr-3">
                    <i :class="[isPasswordVisible ? 'fas fa-eye-slash' : 'fas fa-eye', v$.password.$error ? 'mb-5' : '']"
                      class="text-gray-500"></i>
                  </button>
                  <span v-if="v$.password.$error" class="text-red-600 text-xs px-4 pt-2">Password is
                    required</span>
                </div>


                <!-- Confirm password input -->
                <div class="relative">
                  <label :class="[
                    'absolute left-4 transition-all ease-in-out duration-300 text-gray2',
                    (form.confirm_password.length > 0 || isFocusedConfirmPassword) ? 'text-xs top-2' : 'text-medium top-4',
                    isFocusedConfirmPassword ? 'text-gray-700' : 'text-gray-700'
                  ]" for="confirm_password">
                    Confirm Password
                  </label>
                  <input v-model="form.confirm_password" @focus="isFocusedConfirmPassword = true"
                    @blur="isFocusedConfirmPassword = false" :type="isConfirmPasswordVisible ? 'text' : 'password'"
                    id="confirm_password" :class="[
                      'w-full rounded-xl pt-6 pb-2 px-4 placeholder-gray-500 focus:outline-none focus:border-transparent focus:border-b-2 focus:border-b-indigo-500 hover:border-0.5 hover:border-gray-300',
                      (form.confirm_password.length > 0 && !isFocusedConfirmPassword) ? 'bg-white shadow-lg' : 'bg-gray-100',
                      v$.confirm_password.$error ? 'border-red-600 border-0.5' : ''
                    ]" />
                  <button type="button" @click="isConfirmPasswordVisible = !isConfirmPasswordVisible"
                    class="absolute inset-y-0 right-0 flex items-center pr-3">
                    <i :class="[isConfirmPasswordVisible ? 'fas fa-eye-slash' : 'fas fa-eye', v$.password.$error ? 'mb-5' : '']"
                      class="text-gray-500"></i>
                  </button>
                  <span v-if="v$.confirm_password.$error" class="text-red-600 text-xs px-4 pt-2">Confirm Password is
                    required</span>
                </div>

              </div>
              <div class="grid grid-cols-1 gap-6">
                <!-- Row with text "Private profile" and switcher -->
                <div class="flex justify-between items-center">
                  <span class="text-gray-700 text-sm font-bold">Private profile</span>
                  <div class="switch-container">
                    <input type="checkbox" id="customSwitch" v-model="form.private" class="switch-checkbox"
                     />
                    <label for="customSwitch" class="switch-label">
                      <span class="switch-text" :class="{ 'text-active': form.private }">{{ form.private ? 'YES' : 'NO'
                      }}</span>
                      <span class="switch-slider"></span>
                    </label>
                  </div>
                </div>
                <!-- Divider -->
                <div class="border-t border-gray-300 mt-4"></div>
              </div>
              <!-- Submit button -->
              <div class="flex flex-col-reverse md:grid md:grid-cols-[3fr,5fr] gap-10">
                <button type="submit"
                  class="rounded-xl text-sm text-white w-full justify-center py-4 px-5 bg-gradient-to-r from-violet1 to-dark-blue hover:from-dark-blue hover:to-violet1 hover:shadow-xl  hover:shadow-indigo-500/50">
                  Sign up
                </button>
                <!-- Checkbox with text on the right -->
                <div class="flex items-center">
                  <label class="inline-flex items-center cursor-pointer select-none"
                    :class="{ 'opacity-50': isDisabledTerms }">
                    <input id="agreeTerms" type="checkbox" class="sr-only" v-model="form.terms"
                      :disabled="isDisabledTerms" />
                    <span class="relative">
                      <span 
                      :class="form.terms ? 'bg-dark-blue' : 'bg-gray-100'" class="block w-6 h-6 rounded border border-transparent hover:border-gray-400"></span>
                      <svg class="w-4 h-4 text-white pointer-events-none absolute top-1 left-1" v-show="form.terms"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                  </label>
                  <label for="agreeTerms" class="ml-4 text-sm text-gray-600 font-medium">
                    Creating an account means you are okay with our Privacy Policy.
                  </label>
                  <span v-if="v$.terms.$error" class="text-red-500 text-xs">You must agree to the terms and
                    conditions</span>
                </div>
              </div>
            </form>
          </div>
          <div v-else key="success" class="text-center transition-opacity">
            <div
              class="text-green-500 mx-auto flex items-center justify-center h-32 w-32 bg-green-500 rounded-full shadow-xl shadow-green-200">
              <i class="fas fa-check text-white text-4xl"></i>
            </div>
            <h2 class="text-5xl text-center pt-10">Success</h2>
            <h2 class="text-5xl text-center mb-8">registration</h2>
            <p class="text-gray2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt
              ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
              dolore
              eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.</p>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick, computed } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength, sameAs } from '@vuelidate/validators';
import { createPopper } from '@popperjs/core';
import "/node_modules/flag-icons/css/flag-icons.min.css";


const isFocusedEmail = ref(false);
const isFocusedFirstName = ref(false);
const isFocusedSecondName = ref(false);
const isFocusedPassword = ref(false);
const isFocusedConfirmPassword = ref(false);
const isFocusedCountry = ref(false);
const isFocusedLang = ref(false);

const isDisabledTerms = ref(false);
const isPasswordVisible = ref(false);
const isConfirmPasswordVisible = ref(false);

const showDropdownCountries = ref(false);
const showDropdownLangs = ref(false);

const countryButton = ref(null);
const countryDropdown = ref(null);
const langButton = ref(null);
const langDropdown = ref(null);

const formSubmittedSuccessfully = ref(false);
let countries = ref([]);
const langs = [
  { code: "fi fi-sk", name: "Slovak" },
  { code: "fi fi-gb", name: "English" }
];

let countryPopperInstance = null;
let langPopperInstance = null;

interface Form {
  email: string;
  first_name: string;
  second_name: string;
  lang: string[];
  country: string[];
  password: string;
  confirm_password: string;
  private: boolean,
  terms: string,
}

const form = ref<Form>({
  email: '',
  first_name: '',
  second_name: '',
  lang: [],
  country: [],
  password: '',
  confirm_password: '',
  private: false,
  terms: '',
});

const rules = {
  email: { required, email },
  first_name: { required, minLength: minLength(2) },
  second_name: { required, minLength: minLength(2) },
  lang: { required },
  country: { required },
  password: { required, minLength: minLength(8) },
  confirm_password: { required, sameAsPassword: sameAs(computed(() => form.value.password)) },
  terms: { required },
};


const toggleDropdownCountries = (event) => {
  event.stopPropagation();
  showDropdownCountries.value = !showDropdownCountries.value;
};

const toggleDropdownLangs = (event) => {
  event.stopPropagation();
  showDropdownLangs.value = !showDropdownLangs.value;
};

watch(showDropdownCountries, (newValue) => {
  managePopperInstance(newValue, countryButton, countryDropdown, countryPopperInstance, (instance) => {
    countryPopperInstance = instance;
  });
});

watch(showDropdownLangs, (newValue) => {
  managePopperInstance(newValue, langButton, langDropdown, langPopperInstance, (instance) => {
    langPopperInstance = instance;
  });
});

const selectLang = (selectedLang) => {
  form.value.lang = selectedLang.name;
  showDropdownLangs.value = false;
};

const selectCountry = (selectedCountry) => {
  form.value.country = selectedCountry;
  showDropdownCountries.value = false;
};



function managePopperInstance(show, buttonRef, dropdownRef, currentInstance, setInstanceCallback) {
  nextTick(() => {
    if (show && buttonRef.value && dropdownRef.value) {
      if (currentInstance) {
        currentInstance.destroy();
      }
      const instance = createPopper(buttonRef.value, dropdownRef.value, {
        placement: 'bottom-start',
        strategy: 'absolute',
        modifiers: [{ name: 'offset', options: { offset: [0, 8] } }],
      });
      setInstanceCallback(instance);
    } else if (currentInstance) {
      currentInstance.destroy();
      setInstanceCallback(null);
    }
  });
}

document.addEventListener('click', (event) => {
  if (!countryButton.value?.contains(event.target) && !countryDropdown.value?.contains(event.target)) {
    showDropdownCountries.value = false;
  }
  if (!langButton.value?.contains(event.target) && !langDropdown.value?.contains(event.target)) {
    showDropdownLangs.value = false;
  }
});

const fetchCountries = async () => {
  try {
    const response = await fetch('https://restcountries.com/v2/all?fields=name');
    const data = await response.json();
    countries = data.map(country => country.name);
  } catch (error) {
    console.error('Error fetching countries:', error);
  }
};

onMounted(() => {
  fetchCountries();
});

const v$ = useVuelidate(rules, form);

const handleSubmit = () => {
  v$.value.$touch();
  if (!v$.value.$error) {
    formSubmittedSuccessfully.value = true;
  } else {
    console.error('Validation errors:', v$.value.$errors);
  }
};



</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.7s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}</style>