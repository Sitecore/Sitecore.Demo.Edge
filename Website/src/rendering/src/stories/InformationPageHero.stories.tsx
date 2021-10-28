import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import InformationPageHero from '../components/InformationPageHero';

export default {
  title: 'Components/InformationPageHero',
  component: InformationPageHero,
} as ComponentMeta<typeof InformationPageHero>;

const Template: ComponentStory<typeof InformationPageHero> = (args) => (
  <InformationPageHero {...args} />
);

export const WithLargerImage = Template.bind({});
WithLargerImage.args = {
  params: {
    name: 'InformationPageHero',
  },
  fields: {
    Name: {
      value: 'Fitbit',
    },
    Image: {
      value: {
        src: 'https://demoedge.sitecoresandbox.cloud/api/public/content/fddf681166144085b1aa1bef893fca9b?v=df31289a&t=profile',
        height: 133,
        width: 600,
      },
    },
    FacebookProfileLink: {
      value: 'https://facebook.com/asada',
    },
    TwitterProfileLink: {
      value: 'https://twitter.com/asada',
    },
    InstagramProfileLink: {
      value: 'https://instagram.com/asada',
    },
    LinkedinProfileLink: {
      value: 'https://linkedin.com/asada',
    },
  },
  type: 'vendor',
  qualificative: 'Featured',
};

export const WithSmallerImage = Template.bind({});
WithSmallerImage.args = {
  params: {
    name: 'InformationPageHero',
  },
  fields: {
    Name: {
      value: 'Fitbit',
    },
    Image: {
      value: {
        src: '/assets/img/aboutus/fitbit-logo.png',
      },
    },
    FacebookProfileLink: {
      value: 'https://facebook.com/asada',
    },
    TwitterProfileLink: {
      value: 'https://twitter.com/asada',
    },
    InstagramProfileLink: {
      value: 'https://instagram.com/asada',
    },
    LinkedinProfileLink: {
      value: 'https://linkedin.com/asada',
    },
  },
  type: 'vendor',
  qualificative: 'Featured',
};

export const WithoutQualificative = Template.bind({});
WithoutQualificative.args = {
  params: {
    name: 'InformationPageHero',
  },
  fields: {
    Name: {
      value: 'Fitbit',
    },
    Image: {
      value: {
        src: '/assets/img/aboutus/fitbit-logo.png',
      },
    },
    FacebookProfileLink: {
      value: 'https://facebook.com/asada',
    },
    TwitterProfileLink: {
      value: 'https://twitter.com/asada',
    },
    InstagramProfileLink: {
      value: 'https://instagram.com/asada',
    },
    LinkedinProfileLink: {
      value: 'https://linkedin.com/asada',
    },
  },
  type: 'vendor',
  qualificative: '',
};

export const WithoutInformations = Template.bind({});
WithoutInformations.args = {
  params: {
    name: 'InformationPageHero',
  },
  fields: {
    Name: {
      value: 'Fitbit',
    },
    Image: {
      value: {
        src: '/assets/img/aboutus/fitbit-logo.png',
      },
    },
    FacebookProfileLink: {
      value: 'https://facebook.com/asada',
    },
    TwitterProfileLink: {
      value: 'https://twitter.com/asada',
    },
    InstagramProfileLink: {
      value: 'https://instagram.com/asada',
    },
    LinkedinProfileLink: {
      value: 'https://linkedin.com/asada',
    },
  },
  type: 'vendor',
  qualificative: '',
};

export const WithEmptyInformations = Template.bind({});
WithEmptyInformations.args = {
  params: {
    name: 'InformationPageHero',
  },
  fields: {
    Name: {
      value: 'Fitbit',
    },
    Image: {
      value: {
        src: '/assets/img/aboutus/fitbit-logo.png',
      },
    },
    FacebookProfileLink: {
      value: 'https://facebook.com/asada',
    },
    TwitterProfileLink: {
      value: 'https://twitter.com/asada',
    },
    InstagramProfileLink: {
      value: 'https://instagram.com/asada',
    },
    LinkedinProfileLink: {
      value: 'https://linkedin.com/asada',
    },
  },
  type: 'vendor',
  qualificative: '',
  informations: <></>,
};

export const WithInformations = Template.bind({});
WithInformations.args = {
  params: {
    name: 'InformationPageHero',
  },
  fields: {
    Name: {
      value: 'Fitbit',
    },
    Image: {
      value: {
        src: '/assets/img/aboutus/fitbit-logo.png',
      },
    },
    FacebookProfileLink: {
      value: 'https://facebook.com/asada',
    },
    TwitterProfileLink: {
      value: 'https://twitter.com/asada',
    },
    InstagramProfileLink: {
      value: 'https://instagram.com/asada',
    },
    LinkedinProfileLink: {
      value: 'https://linkedin.com/asada',
    },
  },
  type: 'vendor',
  qualificative: '',
  informations: (
    <>
      <div>
        <span className="label">Job Title:</span> <span>Value</span>
      </div>
      <div>
        <span className="label">Company:</span> <span>Value</span>
      </div>
      <div>
        <span className="label">Location:</span> <span>Value</span>
      </div>
    </>
  ),
};
