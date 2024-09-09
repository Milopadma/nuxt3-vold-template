<template>
  <section id="joinus" class="form-section">
    <div class="col form-image">
      <div ref="elImg" class="form-image-img">
        <NuxtPicture class="image" src="/form.jpg" :img-attrs="{ alt: 'Form' }" />
      </div>
    </div>
    <div class="col form-content">
      <h2 class="font-subheading1">Take the First Step</h2>
      <p class="desc font-body2">
        Become a member of ELEMENTIS Club and take the first step towards a life filled with purpose, Wellness, and connection.
      </p>

      <form class="form" @submit.prevent="submitForm">
        <FormInput v-model="formData.fullname" name="fullname" label="Full Name" placeholder="Enter your name" />

        <FormInput v-model="formData.email" name="email" label="Email Address" type="email" placeholder="Enter your email address" />

        <FormPhoneNumber
          ref="inputPhone"
          v-model="formData.phone"
          :items="countryList"
          name="phone"
          label="Phone Number"
          placeholder="Enter your phone number" />

        <FormSelect v-model="formData.country" :items="countryList" name="country" label="Country" placeholder="Select your country" />

        <div class="category">
          <p class="category-title">I would like to receive information on ELEMENTIS.</p>

          <div class="category-group">
            <FormCheckbox v-for="item in formData.category" :key="item.name" v-model="item.value" :name="item.name" :label="item.label" />
          </div>
        </div>

        <div class="agree">
          <FormCheckbox v-model="isAgree" name="agree" label="I agree to the" :required="true" :policy="true" />
        </div>

        <button class="form-button font-button2" type="submit" :disabled="loading">
          <span>{{ loading ? 'Please Wait' : 'Sign Up' }}</span>
          <span class="icon-wrapper"><IconArrowUpRight class="icon" /></span>
        </button>

        <p v-if="!loading && message" style="margin-top: 1rem">{{ message }}</p>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import countryList from '~/data/country.json';

const { executeRecaptcha } = useGoogleRecaptcha();

const isAgree = ref(false);

const formState = {
  fullname: '',
  email: '',
  phone: '',
  country: '',
  category: [
    {
      label: 'Resorts and Residences',
      name: 'resort-residences',
      value: false,
    },
    {
      label: 'Retreats',
      name: 'retreats',
      value: false,
    },
    {
      label: 'Wellness',
      name: 'wellness',
      value: false,
    },
    {
      label: 'New Developments',
      name: 'new-developments',
      value: false,
    },
    {
      label: 'Building Innovation',
      name: 'building-innovation',
      value: false,
    },
  ],
};

const formData = reactive({ ...formState });
const inputPhone = ref();
const message = ref<string | undefined>(undefined);
const loading = ref<boolean>(false);

const submitForm = async () => {
  if (!isAgree.value) {
    message.value = 'Please agree to the policies and terms.';
    return;
  }

  const captcha = await executeRecaptcha('submit');
  if (!captcha.token) {
    message.value = 'Please verify that you are not a robot.';
    return;
  }

  loading.value = true;
  const { data } = await useFetch('/forms', {
    method: 'POST',
    body: {
      ...formData,
      category: formData.category.filter((item) => item.value).map((item) => item.label),
      token: captcha.token,
    },
  });
  loading.value = false;

  message.value = data.value?.message;
  if (data.value?.isSuccess) {
    resetValue();
  }
};

const resetValue = () => {
  Object.assign(formData, formState);
  formData.category.forEach((item) => {
    item.value = false;
  });
  inputPhone.value?.resetValue();
  formData.country = getUserCountry();
  isAgree.value = false;
};

const elImg = ref<HTMLElement | null>(null);

useParallax(elImg, {
  speed: 30,
});

onMounted(() => {
  formData.country = getUserCountry();
});
</script>

<style scoped lang="scss">
.form-section {
  display: flex;
  color: var.$color-primary;

  ::selection {
    color: var.$color-background2;
    background: var.$color-primary;
  }

  @include mx.mobile {
    flex-direction: column;
  }

  .col {
    width: 50%;

    @include mx.mobile {
      width: 100%;
    }
  }

  .form-image {
    height: auto;

    @include mx.mobile {
      width: 100%;
      height: fn.toVw(460);
    }

    .form-image-img {
      width: 100%;
      height: 100%;
    }

    .image {
      width: 100%;
      height: 100%;

      &:deep(img) {
        height: 100%;
      }
    }
  }

  .form-content {
    padding: fn.toVw(110) fn.toVw(156);
    background-color: var.$color-background2;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @include mx.mobile {
      padding: fn.toVw(96) fn.toVw(20);
    }

    .desc {
      width: 100%;
      max-width: fn.toVw(386);
      margin-top: fn.toVw(32);
      margin-bottom: fn.toVw(40);

      @include mx.mobile {
        max-width: fn.toVw(313);
      }
    }
  }

  .form {
    width: 100%;
    max-width: fn.toVw(408);

    .category {
      font-size: fn.toVw(16);
      margin-top: fn.toVw(40);

      .category-title {
        margin-bottom: fn.toVw(24);

        @include mx.mobile {
          margin-bottom: fn.toVw(20);
          max-width: fn.toVw(300);
          line-height: calc(20 / 16);
        }
      }

      .category-group {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: fn.toVw(16);
      }
    }

    .agree {
      display: flex;
      gap: fn.toVw(8);
      align-items: center;
      font-size: fn.toVw(16);
      margin-top: fn.toVw(35);
    }

    .form-button {
      width: 100%;
      color: var.$color-text;
      background-color: var.$color-primary;
      padding: fn.toVw(20) fn.toVw(24);
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      transition: background-color 0.3s ease;
      margin-top: fn.toVw(56);

      &:hover {
        background-color: var.$color-secondary;
      }

      .icon-wrapper {
        width: 100%;
        max-width: fn.toVw(12);
      }

      .icon {
        width: 100%;
        height: auto;
      }
    }
  }
}
</style>
