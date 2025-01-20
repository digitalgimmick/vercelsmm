import ToolFAQ from '@/components/tools/sections/ToolFAQ';

export default function FAQ() {
  return (
    <ToolFAQ
      title="Frequently Asked Questions"
      description="Everything you need to know about our thumbnail downloader"
      faqs={[
        {
          question: "What thumbnail qualities are available?",
          answer: "We provide thumbnails in multiple resolutions: Default (120x90), Medium (320x180), High (480x360), Standard (640x480), and Maximum Resolution (1280x720) when available."
        },
        {
          question: "Can I download thumbnails from any YouTube video?",
          answer: "Yes, you can download thumbnails from any public YouTube video. Private or unlisted videos are not accessible."
        },
        {
          question: "Do I need to create an account?",
          answer: "No, our tool is completely free to use and doesn't require any registration or account creation."
        },
        {
          question: "What file format are the thumbnails?",
          answer: "All thumbnails are downloaded in JPG format, which is the standard format used by YouTube."
        },
        {
          question: "Is there a limit to how many thumbnails I can download?",
          answer: "No, there are no limits on the number of thumbnails you can download. Use our tool as much as you need!"
        }
      ]}
    />
  );
}
