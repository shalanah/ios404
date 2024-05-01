import React, { useRef, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styled from 'styled-components';
import { DialogClose, DialogContent, DialogOverlay } from './dialogStyles';

const Dl = styled.dl`
  a {
    text-decoration: underline;
    text-underline-offset: 0.2em;
  }
  dt {
    color: var(--titleFg);
    line-height: 1.2;
    font-size: 0.9rem;
    font-weight: 700;
    margin-bottom: 10px;
  }
  dd {
    line-height: 1.6;
    font-size: 0.9rem;
    margin-bottom: 25px;
  }
  dd:last-child {
    margin-bottom: 0px;
  }
`;

const FAQ = [
  [
    'Is this site affiliated with Apple, iOS, or caniuse.com?',
    'No. Absolutely not. Nada. Zilch. Zero. Nein. Null. Non.',
  ],
  [
    'What data sources are you using?',
    'iOS404 uses ([caniuse](https://github.com/Fyrd/caniuse/tree/main)) data and [MDN browser-compat-data](https://github.com/mdn/browser-compat-data) data.',
  ],
  // [
  //   'Why are there some duplicate features?',
  //   'Some features are in both caniuse and MDN data or in both CSS and APIs. ',
  // ],
  [
    'What browsers can I compare to iOS WebKit?',
    'You can select from Chrome for Android, Firefox for Android, and/or Safari Desktop. Click on the browser icon to select or deselect a browser. The default comparison browser is Chrome for Android.',
  ],
  [
    'How do I filter out non-standard specifications?',
    'Click on the filter icon to remove less-standard or non-standard specifications from your search.',
  ],
  [
    'How do you determine if something is not supported?',
    'If the selected comparison browser(s) supports a feature more than iOS WebKit, then that feature is consider missing with special note if support is "Partial".',
  ],

  [
    'How do I report a bug or ask a feature for iOS404?',
    'Thank you for your help in making iOS404 better! Open an issue on [GitHub](https://github.com/shalanah/iOS404/issues).',
  ],
  [
    'Do you track me?',
    'iOS404 uses TelemetryDeck. TelemetryDeck does not collect any personally identifiable information. iOS404 sends a best guess on timezone and device type ("phone", "tablet" or "desktop") and on load sends which site feature and specification filters are active. This helps to understand how our users are using the website and how we can improve it. You can read more about [TelemetryDeck’s privacy policy](https://telemetrydeck.com/privacy)',
  ],
  [
    'Who are you?',
    "Hi! 👋 I'm Shalanah Dawson a developer that believes the web should be powerful, approachable, and fun. Find me on [Twitter](https://twitter.com/shalanahfaith), [GitHub](https://github.com/shalanah), or [LinkedIn](https://linkedin.com/in/shalanah).",
  ],
  ['', 'Copyright 2024. All Rights Reserved - Shalanah Dawson'],
];

export const About = ({ button }: { button: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);
  return (
    <Dialog.Root open={open}>
      <Dialog.Trigger asChild ref={ref} onClick={() => setOpen(!open)}>
        {button}
      </Dialog.Trigger>
      <Dialog.Portal>
        <DialogOverlay />
        <DialogContent
          onEscapeKeyDown={() => setOpen(false)}
          onPointerDownOutside={(e) => {
            if (
              e.target &&
              (e.target as HTMLElement).closest('button') !== ref.current
            )
              setOpen(false);
          }}
        >
          <Dl>
            {FAQ.map(([question, answer], i) => (
              <React.Fragment key={i}>
                <dt>
                  <Markdown remarkPlugins={[remarkGfm]}>{question}</Markdown>
                </dt>
                <dd>
                  <Markdown remarkPlugins={[remarkGfm]}>{answer}</Markdown>
                </dd>
              </React.Fragment>
            ))}
          </Dl>
          <DialogClose onClick={() => setOpen(false)}>
            <Cross2Icon />
          </DialogClose>
        </DialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
};