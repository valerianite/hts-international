// Site-wide facts. Source: live site footer (9 Swift Way etc.) captured 2026-11-23.
export const site = {
  name: 'HTS International',
  tagline: 'Servicing the Plastics Industry',
  url: 'https://www.hts.international',
  address: ['9 Swift Way', 'Dandenong South', 'Victoria Australia 3175'],
  phone: '+61 (3) 9013 5413',
  phoneHref: 'tel:+61390135413',
  email: 'contact@hts.international',
  social: [
    { label: 'Instagram', href: 'https://www.instagram.com/hts.international/' },
    { label: 'Facebook', href: 'https://www.facebook.com/HTSInternational' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/htsinternational' },
    { label: 'WhatsApp', href: 'https://wa.link/6zb6mv' },
  ],
};

// Contact form delivery (Web3Forms, https://web3forms.com). The access key is public by design
// (it is sent from the browser and can only deliver to the email it was issued for).
// To get it: enter contact@hts.international at web3forms.com; the key is emailed to that address.
// Leave empty until then: the form shows as "not connected" and points visitors to the email address.
export const form = {
  accessKey: '', // TODO: paste the Web3Forms access key here
  endpoint: 'https://api.web3forms.com/submit',
  subjectLine: 'New enquiry from hts.international',
};

export const nav = [
  { label: 'Products', href: '/products' },
  { label: 'Services', href: '/services' },
  { label: 'Catalogues', href: '/catalogues' },
  { label: 'Contact', href: '/contact-us' },
];
