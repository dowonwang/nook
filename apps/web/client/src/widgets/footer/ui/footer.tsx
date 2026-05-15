export function Footer() {
  return (
    <footer className='bg-footer border-border border-t px-4 py-4'>
      <div className='text-secondary-foreground container mx-auto space-y-1 text-center text-sm'>
        <p className='font-semibold'>
          Next.js & Elysia &middot; Created by Dowon Wang
        </p>
        <p>
          Open source on{' '}
          <a
            href='https://github.com/dowonwang'
            target='_blank'
            rel='noopener noreferror'
            className='font-semibold underline'
          >
            GitHub
          </a>
        </p>
      </div>
    </footer>
  );
}
