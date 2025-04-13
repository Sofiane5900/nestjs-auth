/**
 * Configuration de l'application
 * @module config
 * @description Définit la configuration de l'application
 */

/**
 * @function default
 * @description Retourne la configuration de l'application
 * @returns {Object} Configuration de l'application
 */
export default() => ({
    jwt: {
        secret: process.env.JWT_SECRET
    }
})