import { Injectable, Logger } from '@nestjs/common'
import { DeepPartial, Repository, FindOptionsSelect } from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'

import { handleDBExceptions } from '@utils/databaseException'

type valueOfSearch = string | Date

/**
 * Generic provider class for managing entity operations in the database.
 */
@Injectable()
export class EntityServiceProvider<T> {
  private repository: Repository<T>
  private readonly logger: Logger
  private readonly entityName: string

  /**
   * Initializes the provider with a specific repository and entity name.
   *
   * @param repository - The TypeORM repository for the entity.
   * @param entityName - The name of the entity managed by this provider.
   */
  protected constructor(repository: Repository<T>, entityName: string) {
    this.repository = repository
    this.entityName = entityName
    this.logger = new Logger(`${entityName}-Entity-Provider`)
  }

  /**
   * Finds an entity by a specified field and value.
   *
   * @param field - The field to search by.
   * @param value - The value to match against the field.
   * @param methodName - The name of the method calling this function.
   * @param selectOptions - Optional fields to include in the result.
   * @returns An object indicating the success status and the found entity or error message.
   */
  async findEntityByField(
    field: keyof T,
    value: valueOfSearch,
    methodName: string,
    selectOptions: FindOptionsSelect<T> = {},
  ) {
    this.logger.log(``)
    this.logger.log(`==== Method beginning: ${methodName} ====`)
    let success = true

    try {
      const entity = await this.repository.findOne({
        where: { [field]: value } as never,
        select: selectOptions,
      })

      this.logger.log(`Validating if entity exists: ${entity != null}`)

      if (!entity)
        return {
          success: false,
          data: { code: 404, message: `${this.entityName} was not found` },
        }

      this.logger.log(
        `Entity found by ${String(field)}: ${JSON.stringify(entity)}`,
      )
      this.logger.log(`===== End of method: ${methodName} =====`)

      return { success, data: entity }
    } catch (error) {
      success = false
      const { data } = handleDBExceptions(error, methodName)

      return { success, data }
    }
  }

  /**
   * Finds an entity by specified fields and values.
   *
   * @param searchParams - An object where keys are fields and values are the values to match against the fields.
   * @param selectOptions - Optional fields to include in the result.
   * @param methodName - The name of the method calling this function.
   * @returns An object indicating the success status and the found entity or error message.
   */
  async findEntityMultipleFields(
    searchParams: Partial<Record<keyof T, valueOfSearch>>,
    selectOptions: FindOptionsSelect<T> = {},
    methodName: string,
  ) {
    this.logger.log(``)
    this.logger.log(`==== Method beginning: ${methodName} ====`)
    let success = true

    try {
      const entity = await this.repository.findOne({
        where: searchParams as never,
        select: selectOptions,
      })

      this.logger.log(`Validating if entity exists: ${entity != null}`)

      if (!entity)
        return {
          success: false,
          data: { code: 404, message: `${this.entityName} was not found` },
        }

      this.logger.log(
        `Entity found by ${JSON.stringify(searchParams)}: ${JSON.stringify(
          entity,
        )}`,
      )
      this.logger.log(`===== End of method: ${methodName} =====`)

      return { success, data: entity }
    } catch (error) {
      success = false
      const { data } = handleDBExceptions(error, methodName)

      return { success, data }
    }
  }

  /**
   * Finds all records in the entity repository.
   *
   * @param methodName - The name of the method calling this function.
   * @returns An object indicating the success status and the list of all records for the entity or an error message.
   */
  async findAllEntity(methodName: string) {
    this.logger.log(``)
    this.logger.log(`==== Method beginning: ${methodName} ====`)
    let success = true

    try {
      const entity = await this.repository.find()

      this.logger.log(`Validating if entity exists: ${entity != null}`)

      this.logger.log(`===== End of method: ${methodName} =====`)

      return { success, data: entity }
    } catch (error) {
      success = false
      const { data } = handleDBExceptions(error, methodName)

      return { success, data }
    }
  }

  /**
   * Deletes all records in the entity repository.
   *
   * @param methodName - The name of the method calling this function.
   * @returns A promise that resolves when the deletion is complete.
   */
  async deleteAllEntity(methodName: string) {
    this.logger.warn(``)
    this.logger.warn(`==== Method beginning: ${methodName} ====`)
    try {
      const query = this.repository.createQueryBuilder(this.entityName)
      this.logger.warn(`===== End of method: ${methodName} =====`)

      await query.delete().where({}).execute()
    } catch (error) {
      handleDBExceptions(error, methodName)
    }
  }

  /**
   * Deactivate a single record by its ID for the specified entity.
   *
   * @param id - The ID of the entity to delete.
   * @param methodName - The name of the method calling this function.
   * @returns An object indicating the success status and a message or error details.
   */
  async deleteOneEntity(id: string, methodName: string) {
    this.logger.log(` `)
    this.logger.log(`===== Method beginning: ${methodName} =====`)

    const { data: dataEntity, success: successEntity } =
      await this.findEntityByField(`id` as keyof T, id, `findOneById`)

    if (!successEntity) return { success: false, data: dataEntity }

    let success = true

    try {
      const payload: QueryDeepPartialEntity<T> = {
        is_active: false,
      } as unknown as QueryDeepPartialEntity<T>

      await this.repository.update({ id } as never, payload)

      const data = { message: `Record was deleted successfully` }

      this.logger.log(
        `Entity: ${this.entityName} with id: ${id} was successfully deactivated`,
      )
      this.logger.log(`==== End of method: ${methodName} ====`)

      return { success, data }
    } catch (error) {
      success = false
      const data = handleDBExceptions(error, methodName)

      return { success, data }
    }
  }

  /**
   * Updates a single record by its ID for the specified entity.
   *
   * @param id - The ID of the entity to update.
   * @param updateDTO - The partial entity data to update.
   * @param methodName - The name of the method calling this function.
   * @returns An object indicating the success status and a message or error details.
   */
  async updateOneEntity(id: string, updateDTO: Partial<T>, methodName: string) {
    this.logger.log(``)
    this.logger.log(`==== Method beginning: ${methodName} ====`)

    const { data: dataEntity, success: successEntity } =
      await this.findEntityByField(`id` as keyof T, id, `findOneById`)

    if (!successEntity) return { success: false, data: dataEntity }

    let success = true

    try {
      updateDTO[`updated_at`] = new Date()

      await this.repository.update(
        { id } as never,
        updateDTO as QueryDeepPartialEntity<T>,
      )

      this.logger.log(`==== response: ${methodName} ====`)
      this.logger.log(
        `Entity record with id: ${id} was successfully updated on DB}`,
      )
      this.logger.log(`===== End of method: ${methodName} =====`)

      return {
        success,
        data: {
          message: `Entity record with id: ${id} was successfully updated`,
        },
      }
    } catch (error) {
      success = false
      const { data } = handleDBExceptions(error, methodName)

      return { success, data }
    }
  }

  /**
   * Creates a new record in the entity repository.
   *
   * @param createDTO - The partial entity data to create.
   * @param methodName - The name of the method calling this function.
   * @returns An object indicating the success status and the created record or error details.
   */
  async createOneEntity(createDTO: DeepPartial<T>, methodName: string) {
    this.logger.log(``)
    this.logger.log(`==== Method beginning: ${methodName} ====`)

    let success = true

    try {
      const entity = await this.repository.create(createDTO)
      await this.repository.save(entity)

      this.logger.log(`Record created on DB: ${JSON.stringify(entity)}`)
      this.logger.log(`===== End of method: ${methodName} =====`)

      return { success, data: entity }
    } catch (error) {
      success = false
      const { data } = handleDBExceptions(error, `${methodName}`)
      return { success, data }
    }
  }
}
