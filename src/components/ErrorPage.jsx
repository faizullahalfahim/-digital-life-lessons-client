import React from 'react';
import PropTypes from 'prop-types';
import Lottie from 'lottie-react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';



const ErrorPage = ({
  title = 'Ooops — An error occurred',
  description = "Looks like something went wrong. Don't worry — you can try again or go back home.",
  code = null,
  onRetry = null,
  animationData = null,
  showHome = true,
  homeHref = '/',
}) => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-base-200 p-6">
      <section className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="flex flex-col items-start gap-6">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-9 h-9 text-error" />
            <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
          </div>

          <p className="text-base-content/80 text-sm md:text-base">{description}</p>

          {code && (
            <div className="badge badge-outline">Error code: {code}</div>
          )}

          <div className="flex gap-3 mt-2">
            <button
              onClick={onRetry}
              className={`btn ${onRetry ? 'btn-primary' : 'btn-disabled'}`}
              aria-disabled={!onRetry}
              aria-label="Retry"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Retry
            </button>

            {showHome && (
              <a href={homeHref} className="btn btn-ghost">
                <Home className="w-4 h-4 mr-2" />
                Home
              </a>
            )}
          </div>

          <div className="mt-4 text-xs text-muted">If the problem persists, contact support with the error code above.</div>
        </div>

        <div className="flex items-center justify-center">
          {animationData ? (
            <div className="w-full max-w-md">
              <Lottie
                animationData={animationData}
                loop={true}
                autoplay={true}
                style={{ width: '100%', height: '100%' }}
                aria-label="Error animation"
                role="img"
              />
            </div>
          ) : (
            <div className="p-8 rounded-2xl shadow-lg bg-base-100 flex flex-col items-center justify-center">
              <AlertCircle className="w-24 h-24 text-error mb-4" />
              <p className="text-center">An error occurred</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

ErrorPage.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  code: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onRetry: PropTypes.func,
  animationData: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  showHome: PropTypes.bool,
  homeHref: PropTypes.string,
};

export default ErrorPage;
