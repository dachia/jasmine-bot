import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import { RequireAuth } from 'src/utils/components/require-auth';

import AuthLayout from 'src/layouts/auth';
import LegalLayout from 'src/layouts/legal';
import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BillingPage = lazy(() => import('src/pages/billing'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const SignUpPage = lazy(() => import('src/pages/sign-up'));
export const TermsPage = lazy(() => import('src/pages/terms'));
export const PrivacyPage = lazy(() => import('src/pages/privacy'));
export const BotRedirectPage = lazy(() => import('src/pages/bot-redirect'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <RequireAuth redirectTo="/login">
          <DashboardLayout>
            <Suspense>
              <Outlet />
            </Suspense>
          </DashboardLayout>
        </RequireAuth>
      ),
      children: [
        { element: <BillingPage />, index: true },
        // { path: 'user', element: <UserPage /> },
        // { path: 'products', element: <ProductsPage /> },
        // { path: 'blog', element: <BlogPage /> },
      ],
    },
    {
      path: 'sign-up',
      element: (
        <AuthLayout>
          <SignUpPage />
        </AuthLayout>
      ),
    },
    {
      path: 'login',
      element: (
        <AuthLayout>
          <LoginPage />
        </AuthLayout>
      ),
    },
    {
      path: "terms",
      element: <LegalLayout>
        <TermsPage />
      </LegalLayout>
    },
    {
      path: "privacy",
      element: <LegalLayout>
        <PrivacyPage />

      </LegalLayout>
    },
    {
      path: '/telegram-redirect',
      element:

        <RequireAuth redirectTo="/login">
          <AuthLayout>
            <BotRedirectPage />,
          </AuthLayout>
        </RequireAuth>
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    }
  ]);

  return routes;
}
