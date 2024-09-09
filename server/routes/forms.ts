import Mailchimp from '@mailchimp/mailchimp_marketing'
import crypto from 'crypto'

interface FormPayload {
  fullname: string,
  email: string,
  phone: string,
  country: string,
  category: string[]
  token: string
}

interface OpResult {
  isSuccess: boolean
  message: string
}

export default defineEventHandler(async (event) => {
  const payload = await readBody(event) as FormPayload

  let result = validateField(payload)
  if (!result.isSuccess) {
    return result
  }

  result = await verifyRecaptcha(payload)
  if (!result.isSuccess) {
    return result
  }

  result = await getListMember(payload.email)
  if (result.isSuccess) {
    result = await updateListMember(payload)
  } else {
    result = await addListMember(payload)
  }
  return result
})

function validateField(payload: FormPayload): OpResult {
  const { fullname, email, phone, country, category, token } = payload
  if (!fullname || !email || !phone || !country || !category || !token || category.length === 0) {
    return {
      isSuccess: false,
      message: 'Make sure you fill in all the required fields',
    }
  }
  return {
    isSuccess: true,
    message: 'All fields are filled',
  }
}

async function verifyRecaptcha(payload: FormPayload): Promise<OpResult> {
  const config = useRuntimeConfig()
  const recaptchaSecret = config.recaptchaKey
  const recaptchaUrl = 'https://www.google.com/recaptcha/api/siteverify'
  const res = await fetch(recaptchaUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      secret: recaptchaSecret,
      response: payload.token
    })
  })
  const json = await res.json()
  if (json.success) {
    return {
      isSuccess: true,
      message: 'Recaptcha verified',
    }
  } else {
    return {
      isSuccess: false,
      message: 'Recaptcha failed, please try refreshing the page and try again',
    }
  }
}

function mailchimpConf() {
  const config = useRuntimeConfig()
  const key = config.mailchimpKey
  const dc = 'us22'
  const listId = '008b569d86'
  Mailchimp.setConfig({
    apiKey: key,
    server: dc,
  })
  return {
    key,
    dc,
    listId
  }
}

async function getListMember(email: string): Promise<OpResult> {
  try {
    const { listId } = mailchimpConf()
    await Mailchimp.lists.getListMember(listId, email)
    return {
      isSuccess: true,
      message: 'Member found',
    }
  } catch (error: any) {
    return {
      isSuccess: false,
      message: 'Member not found',
    }
  }
}

async function addListMember(payload: FormPayload): Promise<OpResult> {
  try {
    const { listId } = mailchimpConf()
    const [fname, lname = ''] = payload.fullname.split(' ')

    await Mailchimp.lists.addListMember(listId, {
      email_address: payload.email,
      status: 'subscribed',
      merge_fields: {
        FNAME: fname,
        LNAME: lname,
        PHONE: payload.phone,
        COUNTRY: payload.country,
      },
      tags: payload.category,
    })

    return {
      isSuccess: true,
      message: 'Your information has been submitted',
    }
  } catch (error: any) {
    const errorMsg = error.response ? error.response.body.title : error.message
    console.error('Error:', errorMsg);
    const errorRes = {
      isSuccess: false,
      message: errorMsg,
      data: errorMsg
    }
    return errorRes
  }
}

async function updateListMember(payload: FormPayload): Promise<OpResult> {
  try {
    const { listId } = mailchimpConf()
    const [fname, lname = ''] = payload.fullname.split(' ')

    const subHash = crypto.createHash('md5').update(payload.email.toLowerCase()).digest('hex')

    await Mailchimp.lists.updateListMember(listId, subHash, {
      status: 'subscribed',
      merge_fields: {
        FNAME: fname,
        LNAME: lname,
        PHONE: payload.phone,
        COUNTRY: payload.country,
      },
    })

    await Mailchimp.lists.updateListMemberTags(listId, subHash, {
      tags: payload.category.map((tag) => ({ name: tag, status: 'active' }))
    })

    return {
      isSuccess: true,
      message: 'Your information has been updated',
    }
  } catch (error: any) {
    const errorMsg = error.response ? error.response.body.title : error.message
    console.error('Error:', errorMsg);
    const errorRes = {
      isSuccess: false,
      message: errorMsg,
      data: errorMsg
    }
    return errorRes
  }
}