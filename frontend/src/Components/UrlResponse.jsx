import { Text, TextInput, Button, Group } from '@mantine/core';
import { IconCopy, IconCheck } from '@tabler/icons-react';
import Service from '../utils/http';
import { QRCodeSVG } from 'qrcode.react';
import { useState } from 'react';

export default function UrlResponse(props) {
  const obj = new Service();
  const surl = obj.getBaseURL() + '/api/s/' + props?.response?.shortCode;
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(surl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      setCopied(false);
    }
  };

  return (
    <div>
      <Text color="blue" mb="sm">{surl}</Text>

      <Group my="md">
        <TextInput
          value={surl}
          readOnly
          rightSection={
            copied ? (
              <IconCheck color="green" onClick={handleCopy} style={{ cursor: 'pointer' }} />
            ) : (
              <IconCopy onClick={handleCopy} style={{ cursor: 'pointer' }} />
            )
          }
        />

        <Button
          onClick={() => props.setResponse && props.setResponse(null)}
          color="red"
        >
          Reset
        </Button>
      </Group>

      <QRCodeSVG
        value={surl}
        size={400}
        imageSettings={{
          excavate: true,
          src: '/HomeBackground.png',
          height: 100,
          width: 100,
        }}
      />
    </div>
  );
}
