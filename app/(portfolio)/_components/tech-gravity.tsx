import Gravity, { MatterBody } from './fancy/physics/gravity';
import Image from 'next/image';

interface TechItem {
  name: string;
  color: string | null;
  background: string | null;
  slug?: string | null;
  iconUrl?: string | null;
}

const SIMPLE_ICON_OVERRIDES: Record<string, string | null> = {
  CSS3: 'css3',
  HTML5: 'html5',
  'Node.js': 'nodedotjs',
  C: 'c',
  'C++': 'cplusplus',
  'C#': 'csharp',
  '.NET': 'dotnet',
  GitHub: 'github',
  GitLab: 'gitlab',
  'Tailwind CSS': 'tailwindcss',
  Tailwind: 'tailwindcss',
  TailwindCSS: 'tailwindcss',
};

const getSimpleIconSlug = (value: string | null | undefined): string | null => {
  if (!value) {
    return null;
  }

  if (Object.prototype.hasOwnProperty.call(SIMPLE_ICON_OVERRIDES, value)) {
    return SIMPLE_ICON_OVERRIDES[value] ?? null;
  }

  return value.toLowerCase().replace(/\s+/g, '');
};

const getIconUrl = (
  slug: string | null,
  color: string | null,
): string | null => {
  if (!slug) {
    return null;
  }

  if (color) {
    return `https://cdn.simpleicons.org/${slug}/${color.replace('#', '')}`;
  }

  return `https://cdn.simpleicons.org/${slug}`;
};

export default function TechGravity({ slugs }: { slugs: TechItem[] }) {
  return (
    <div className="size-full flex flex-col items-center relative ">
      <Gravity gravity={{ x: 0, y: 1 }} className="size-full">
        {slugs.map((slug, index) => {
          const randomX = Math.random() * 60 + 20; // Random x between 20-80%
          const randomY = Math.random() * 20 + 5; // Random y between 5-25%
          const bodyType = Math.random() > 0.7 ? 'rectangle' : 'circle';
          const iconSlug = getSimpleIconSlug(slug.slug ?? slug.name);
          const iconUrl = slug.iconUrl ?? getIconUrl(iconSlug, slug.color);

          return (
            <MatterBody
              key={`${slug.name}-${slug.color}-${index}`}
              matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
              bodyType={bodyType}
              x={`${randomX}%`}
              y={`${randomY}%`}
            >
              <div
                className={`p-4 ${
                  bodyType === 'circle' ? 'rounded-full' : 'rounded-md'
                } ${slug.background ? slug.background : 'bg-white'} border border-border shadow-md text-foreground dark:text-muted`}
              >
                {iconUrl ? (
                  <Image
                    loader={({ src }) => src}
                    src={iconUrl}
                    alt={slug.name}
                    width={24}
                    height={24}
                    onError={(event) => {
                      const target = event.currentTarget;
                      // Attempt a fallback without custom color if we're using Simple Icons
                      if (
                        !slug.iconUrl &&
                        slug.color &&
                        !target.dataset.fallbackTried
                      ) {
                        target.dataset.fallbackTried = 'true';
                        const fallbackUrl = getIconUrl(iconSlug, null);
                        if (fallbackUrl) {
                          target.src = fallbackUrl;
                          return;
                        }
                      }

                      // Final fallback: hide image and show text badge
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent && !parent.querySelector('.icon-fallback')) {
                        const fallback = document.createElement('span');
                        fallback.className =
                          'icon-fallback text-xs font-semibold text-foreground';
                        fallback.textContent = slug.name
                          .substring(0, 3)
                          .toUpperCase();
                        parent.appendChild(fallback);
                      }
                    }}
                  />
                ) : (
                  <span className="text-xs font-semibold">
                    {slug.name.substring(0, 3).toUpperCase()}
                  </span>
                )}
              </div>
            </MatterBody>
          );
        })}
      </Gravity>
    </div>
  );
}
